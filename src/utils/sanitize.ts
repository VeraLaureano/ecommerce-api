import DOMPurify from 'dompurify';

export const cleanXSS = (dirty: string): string => {
  return DOMPurify.sanitize(dirty);
};