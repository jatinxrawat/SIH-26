/**
 * Script & Cultural Family Fallbacks for Scheduled Indian Languages
 * Ensures obscure scheduled dialects display in their regional script rather than falling back to English.
 */
export const SCRIPT_FAMILY_FALLBACKS = {
  mai: 'hi', // Maithili -> Hindi (Devanagari, Bihar)
  sa: 'hi',  // Sanskrit -> Hindi (Devanagari)
  ne: 'hi',  // Nepali -> Hindi (Devanagari)
  kok: 'mr', // Konkani -> Marathi (Devanagari, Maharashtra/Goa)
  doi: 'pa', // Dogri -> Punjabi/Hindi (Gurmukhi/Devanagari, J&K)
  brx: 'as', // Bodo -> Assamese (Assam/Bodoland)
  mni: 'bn', // Manipuri -> Bengali/Assamese (Meitei Mayek / Bengali script)
  sat: 'or', // Santali -> Odia (Odisha/Jharkhand)
  ks: 'ur',  // Kashmiri -> Urdu (Perso-Arabic, J&K)
  sd: 'gu'   // Sindhi -> Gujarati (Gujarat/Rajasthan)
};
