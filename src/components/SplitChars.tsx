import React from 'react';

// Renders a hero heading as [data-hchar] pieces for the letter-by-letter intro.
// Latin text splits per grapheme; Malayalam splits per word, because cutting a
// word apart would break its conjuncts and vowel signs. *Asterisks* mark the
// accented part, wrapped in <em style={emStyle}>.
const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
const graphemes = (s: string): string[] => (segmenter ? Array.from(segmenter.segment(s), (x) => x.segment) : Array.from(s));
const pieces = (s: string) => (/[ഀ-ൿ]/.test(s) ? s.split(/(\s+)/).filter(Boolean) : graphemes(s));

export default function SplitChars({ text, emStyle }: { text: string; emStyle?: React.CSSProperties }) {
  let k = 0;
  return String(text).split('*').map((part, i) => {
    const spans = pieces(part).map((p) => (/^\s+$/.test(p)
      ? <span key={k++} data-hchar="1" style={{ display: 'inline-block', width: '.25em' }} />
      : <span key={k++} data-hchar="1" style={{ display: 'inline-block' }}>{p}</span>));
    if (!spans.length) return null;
    return i % 2 ? <em key={i} style={emStyle}>{spans}</em> : <React.Fragment key={i}>{spans}</React.Fragment>;
  });
}
