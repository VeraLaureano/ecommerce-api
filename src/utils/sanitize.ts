import sanitizeHtml from 'sanitize-html';

export const cleanXSS = (dirty: string): string => {
  return sanitizeHtml(dirty);
};
