const REPLACE_CHARS = '?$/|[]{}=+*&@#';

export function title2name(title) {
  title = title.toLowerCase()
               .replaceAll(' ', '_')
               .replaceAll('.', '-')
               .replaceAll('\n', '');
  REPLACE_CHARS.split('').forEach((char) => {
    title = title.replaceAll(char, '');
  });
  return title;
}
