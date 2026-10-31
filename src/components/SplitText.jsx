/**
 * Splits text into masked words so GSAP can slide each one up.
 * Pass an array of lines; wrap a word in *asterisks* to italicise it.
 * Real spaces are kept between words so spacing and wrapping stay typographic.
 */
export default function SplitText({ as: Tag = 'h2', lines, className = '', intro = false }) {
  return (
    <Tag className={`split ${intro ? 'split--intro' : ''} ${className}`} aria-label={lines.join(' ').replace(/\*/g, '')}>
      {lines.map((line, li) => (
        <span className="split__line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi, words) => {
            const italic = word.startsWith('*') && word.endsWith('*')
            return (
              <span key={wi}>
                <span className="split__word">
                  <span className={`split__inner ${italic ? 'is-italic' : ''}`}>{italic ? word.slice(1, -1) : word}</span>
                </span>
                {wi < words.length - 1 ? ' ' : null}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
