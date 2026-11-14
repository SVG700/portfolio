import { m } from 'framer-motion'
import { DURATION, EASE, STAGGER, VIEW_ONCE } from '../motion-shared'

type Props = {
  text: string
  /** One word set in the serif italic accent (must appear in `text`). */
  keyword?: string
  className?: string
  as?: 'h2' | 'h3'
}

const word = {
  hidden: { opacity: 0, y: '0.45em' },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
}

/**
 * Section heading whose words lift in one after another; the key word is set
 * in the serif italic accent. Real text stays in the DOM (each word
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
            <m.span className={`relative inline-block ${isKey ? 'serif-accent' : ''}`} variants={word}>
              {w}
            </m.span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </Tag>
  )
}
