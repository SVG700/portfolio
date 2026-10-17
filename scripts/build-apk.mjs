// Rebuilds the signed release APK from the current site content:
//   npm run apk
// 1. builds the website (dist/)  2. copies it into the Android project
// 3. runs Gradle assembleRelease  4. copies the APK to release/ (gitignored)
import { execSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const android = join(root, 'android')
const run = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: 'inherit' })

const signing =
  process.env.PORTFOLIO_SIGNING_PROPERTIES ?? join(homedir(), '.android-keys', 'samhith-portfolio', 'signing.properties')
if (!existsSync(signing)) {
  console.error(`\nSigning file not found: ${signing}\nRestore your keystore backup before building a release.\n`)
  process.exit(1)
}

run('npm run build')
run('npx cap sync android')
const gradlew = join(android, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew')
run(`"${gradlew}" assembleRelease`, android)

const gradle = readFileSync(join(android, 'app', 'build.gradle'), 'utf8')
const version = gradle.match(/versionName "([^"]+)"/)?.[1] ?? 'dev'
const built = join(android, 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk')
const outDir = join(root, 'release')
mkdirSync(outDir, { recursive: true })
const out = join(outDir, `samhith-v-gupta-${version}.apk`)
copyFileSync(built, out)
console.log(`\nSigned APK: ${out}\n`)
