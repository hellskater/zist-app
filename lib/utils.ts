import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (str: string, length = 100) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};
