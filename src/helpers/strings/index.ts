/** Trims, normalizes, toLowercase, and substitutes multiple
 * spaces for single spaces in the middle - very useful for comparisons */
export const strTrimNormLowerRemMultiSpaces = (inputString: string) => {
  return strRemMultiSpaces(inputString.trim().normalize("NFKC").toLowerCase());
};

/** Trims and remove multiple spaces in the middle */
export const strTrimRemMultiSpaces = (inputString: string): string => {
  return strRemMultiSpaces(inputString).trim();
};

/** Substitutes double spaces "  " with single spaces " " recursively */
const strRemMultiSpaces = (inputString: string): string => {
  const newString = inputString.replaceAll("  ", " ");

  /** Lets dig down until nothing is replaced */
  if (newString.length < inputString.length) return strRemMultiSpaces(newString);

  /** Got to the bottom */
  return newString;
};
