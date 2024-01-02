const UNESCAPE_CHARS: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
}

export function unescapeHTML(str: string): string {
  return str.replace(/&amp;|&lt;|&gt;/g, (match) => UNESCAPE_CHARS[match] || match)
}
