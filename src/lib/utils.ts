import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// A map of Unicode characters to their corresponding HTML entities
const unicodeToHTMLEntitiesMap: { [key: string]: string } = {
  é: "&eacute;",
  É: "&Eacute;",
  á: "&aacute;",
  Á: "&Aacute;",
  í: "&iacute;",
  Í: "&Iacute;",
  ó: "&oacute;",
  Ó: "&Oacute;",
  ú: "&uacute;",
  Ú: "&Uacute;",
  ñ: "&ntilde;",
  Ñ: "&Ntilde;",
  ü: "&uuml;",
  Ü: "&Uuml;",
  ç: "&ccedil;",
  Ç: "&Ccedil;",
  à: "&agrave;",
  À: "&Agrave;",
  è: "&egrave;",
  È: "&Egrave;",
  ê: "&ecirc;",
  Ê: "&Ecirc;",
  ô: "&ocirc;",
  Ô: "&Ocirc;",
  â: "&acirc;",
  Â: "&Acirc;",
  î: "&icirc;",
  Î: "&Icirc;",
  õ: "&otilde;",
  Õ: "&Otilde;",
  ã: "&atilde;",
  Ã: "&Atilde;",
  œ: "&oelig;",
  Œ: "&OElig;",
  "¡": "&iexcl;",
  "¿": "&iquest;",
  "©": "&copy;",
  "®": "&reg;",
  "±": "&plusmn;",
  "§": "&sect;",
  "€": "&euro;",
  "£": "&pound;",
  "¥": "&yen;",
  "¢": "&cent;",
  "÷": "&divide;",
  "×": "&times;",
  µ: "&micro;",
  // Add more mappings as needed
};

// Function to replace Unicode characters with corresponding HTML entities
export function unicodeToHTML(str: string): string {
  return str.replace(/[\u00A0-\uFFFF]/g, function (char) {
    return unicodeToHTMLEntitiesMap[char] || char;
  });
}

export function htmlToUnicode(str: string): string {
  return str.replace(/&[a-z]+;/g, (match) => {
    for (const [unicode, entity] of Object.entries(unicodeToHTMLEntitiesMap)) {
      if (entity === match) {
        return unicode;
      }
    }
    return match;
  });
}

export function decodeHTMLEntities(text: string): string {
  const htmlEntitiesMap: { [key: string]: string } = {
    "&ldquo;": "“",
    "&rdquo;": "”",
    "&lsquo;": "‘",
    "&rsquo;": "’",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ",
    "&hellip;": "…",
    "&ndash;": "–",
    "&mdash;": "—",
    // Add more entities if needed
  };

  // First decode html entities to unicode
  const decodedText = htmlToUnicode(text);
  // Then decode html entities to text
  return decodedText.replace(
    /&[a-z]+;/g,
    (match) => htmlEntitiesMap[match] || match
  );
}
