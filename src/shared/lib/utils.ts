import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Объединяет className-строки с учётом tailwind-переопределений.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Форматирует цену в формат EUR (немецкий).
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

/**
 * Обрезает длинный текст до нужной длины с троеточием.
 */
export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

/**
 * Проверяет, является ли строка валидным URL изображения.
 */
export function isValidImageUrl(url: string): boolean {
  return /^https?:\/\/.*\.(jpg|jpeg|png|webp|svg|gif)$/i.test(url);
}
