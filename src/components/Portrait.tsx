import { m } from 'framer-motion'
import { EASE } from '../motion-shared'

/**
 * Profile photo: AVIF → WebP → JPEG, 1x/2x. Fixed 4:5 box so the layout
 * doesn't shift while it loads. The high-resolution original lives in
 * assets/photo/ and is not shipped with the site.
 */
export function Portrait({ className = '' }: { className?: string }) {
  const srcSet = (ext: string) => `/photo/samhith-320.${ext} 320w, /photo/samhith-640.${ext} 640w`
  const sizes = '(min-width: 768px) 128px, 104px'
  return (
    <m.figure
      className={`relative shrink-0 ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
    >
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-raised shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8)]">
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
      {/* Lime corner mark — the same square used beside the name above. */}
      <span className="absolute -right-1 -bottom-1 size-2.5 bg-accent" aria-hidden="true" />
    </m.figure>
  )
}
