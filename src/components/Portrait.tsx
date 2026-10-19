import { m } from 'framer-motion'
import { EASE } from '../motion-shared'
import { ClipReveal } from './ClipReveal'

type Props = {
  className?: string
  /** CSS `sizes` hint for the responsive image. */
  sizes: string
  /** Large hero version: breathing lime glow and a softer, deeper frame. */
  feature?: boolean
  delay?: number
}

const srcSet = (ext: string) =>
  `/photo/samhith-320.${ext} 320w, /photo/samhith-640.${ext} 640w, /photo/samhith-960.${ext} 960w`

/**
 * Profile photo: AVIF → WebP → JPEG at 320/640/960 w. Fixed 4:5 box so the
 * layout never shifts while it loads. The high-resolution original lives in
 * assets/photo/ and is not shipped with the site.
 */
export function Portrait({ className = '', sizes, feature = false, delay = 0.2 }: Props) {
  return (
    <m.figure
      className={`relative shrink-0 ${feature ? 'portrait-glow' : ''} ${className}`}
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <ClipReveal immediate from="bottom" radius={feature ? 22 : 16} delay={delay + 0.05}>
        <div
          className={`overflow-hidden border bg-raised ${
            feature
              ? 'rounded-[22px] border-white/12 shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(212_243_106/0.08)]'
              : 'rounded-2xl border-line-strong shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8)]'
          }`}
        >
          <picture>
            <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
            <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
            <img
              src="/photo/samhith-320.jpg"
              srcSet={srcSet('jpg')}
              sizes={sizes}
              width={320}
              height={400}
              alt="Samhith V Gupta"
              decoding="async"
              fetchPriority="high"
              className="block aspect-[4/5] w-full object-cover object-top"
            />
          </picture>
        </div>
      </ClipReveal>
      {/* Lime corner mark — the same square as in the SG monogram. */}
      <span
        className={`absolute bg-accent ${feature ? '-right-1.5 -bottom-1.5 size-3.5' : '-right-1 -bottom-1 size-2.5'}`}
        aria-hidden="true"
      />
    </m.figure>
  )
}
