import { m } from 'framer-motion'
import { DURATION, EASE, STAGGER, VIEW_ONCE } from '../motion-shared'

type Props = {
  text: string
  /** One word to underline in lime (must appear in `text`). */
  keyword?: string
  className?: string
  as?: 'h2' | 'h3'
}

const word = {
  hidden: { opacity: 0, y: '0.45em' },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
}

/**
 * Section heading whose words lift in one after another, then a lime
 * underline draws under the key word. Real text stays in the DOM (each word
 * is a span), so it reads and wraps exactly like a normal heading.
 */
export function AnimatedHeading({ text, keyword, className = '', as = 'h2' }: Props) {
  const Tag = as === 'h3' ? m.h3 : m.h2
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEW_ONCE}
      variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER.words } } }}
    >
      {words.map((w, i) => {
        const isKey = keyword && w.replace(/[^\p{L}’']/gu, '') === keyword
        return (
          <span key={i}>
            <m.span className="relative inline-block" variants={word}>
              {w}
              {isKey && (
                <m.span
                  aria-hidden="true"
                  className="absolute -bottom-[0.06em] left-0 h-[0.07em] min-h-[2px] w-full origin-left rounded-full bg-accent"
                  variants={{
                    hidden: { scaleX: 0 },
                    show: { scaleX: 1, transition: { duration: DURATION.slow * 0.7, ease: EASE, delay: 0.35 } },
                  }}
                />
              )}
            </m.span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </Tag>
  )
}
