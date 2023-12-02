import fs from 'fs';

export function folders(path) {
  return fs.readdirSync(path).filter((name) => {
    return !name.includes('.');
  });
}