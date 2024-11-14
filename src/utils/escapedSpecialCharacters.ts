// Function that escapes special characters in a given text
export const escapeSpecialCharacters = (text: string): string => {
  text = text.replace(/&/g, '&amp;');
  text = text.replace(/</g, '&lt;');
  text = text.replace(/>/g, '&gt;');
  text = text.replace(/"/g, '&quot;');
  text = text.replace(/'/g, '&#39;');
  
  // Return the escaped text
  return text;
};
  