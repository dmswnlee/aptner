export function highlightText(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
}
