import { GalleryItem } from './models';

export const DATA_ROOT = 'https://data.climbing.is/';

export function listImageUrl(file: string | null | undefined): string {
  return file ? `${DATA_ROOT}listPic.php/${encodeURIComponent(file)}` : '/assets/img/iceland_bg.jpg';
}

export function headImageUrl(file: string | null | undefined): string {
  return file ? `${DATA_ROOT}headPic.php/${encodeURIComponent(file)}` : '/assets/img/iceland_bg.jpg';
}

export function squareThumbUrl(file: string | null | undefined): string {
  return file ? `${DATA_ROOT}squarethumb.php/${encodeURIComponent(file)}` : '/assets/img/iceland_bg.jpg';
}

export function fullImageUrl(file: string | null | undefined): string {
  return file ? `${DATA_ROOT}safetest/stormynd.php/${encodeURIComponent(file)}` : '/assets/img/iceland_bg.jpg';
}

export function selectWideImage(items: GalleryItem[] | null | undefined, seed: string | number): string | null {
  const wide = (items ?? []).filter((item) => (item.ratio ?? 0) > 1.4 && item.file);

  if (wide.length === 0) {
    return (items ?? []).find((item) => item.file)?.file ?? null;
  }

  const value = String(seed);
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = Math.imul(31, hash) + value.charCodeAt(i);
  }

  return wide[Math.abs(hash) % wide.length].file;
}
