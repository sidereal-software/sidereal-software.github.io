export interface CapsSegment {
  text: string
  keepCase: boolean
}

// Two capitals plus a lowercase letter marks an acronym or brand (APIs, pyINDI) that uppercasing would mangle.
function keepsCase(word: string) {
  return /[A-Z].*[A-Z]/.test(word) && /[a-z]/.test(word)
}

export function capsSegments(text: string): CapsSegment[] {
  const segments: CapsSegment[] = []
  for (const part of text.split(/(\s+)/)) {
    if (part === '') continue
    const keepCase = keepsCase(part)
    const last = segments.at(-1)
    if (last && last.keepCase === keepCase && !keepCase) last.text += part
    else segments.push({ text: part, keepCase })
  }
  return segments
}
