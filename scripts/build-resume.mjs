// Renders resume/resume.html to resume/Samhith_V_Gupta_Resume.pdf with
// headless Chrome/Edge:  npm run resume
// Review the PDF, then copy it to public/resume.pdf to publish it.
import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = join(import.meta.dirname, '..')
const src = join(root, 'resume', 'resume.html')
const out = join(root, 'resume', 'Samhith_V_Gupta_Resume.pdf')

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean)
const browser = candidates.find((p) => existsSync(p))
if (!browser) {
  console.error('No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.')
  process.exit(1)
}

execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--allow-file-access-from-files',
  `--print-to-pdf=${out}`,
  pathToFileURL(src).href,
])
console.log(`Resume PDF: ${out} (${Math.round(statSync(out).size / 1024)} KB)`)
