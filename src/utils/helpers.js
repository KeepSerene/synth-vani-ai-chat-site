const getCurrentYear = () => new Date().getFullYear();

/**
 * Converts a given string to title case, where the first letter of each word is capitalized.
 *
 * @param {string} str - The input string to be converted.
 * @returns {string} - The formatted string in title case.
 */
const toTitleCase = (str) => {
  if (!str) return "";

  return str
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : "")) // Handle cases where there might be extra spaces
    .join(" ");
};

export { getCurrentYear, generateId, toTitleCase };
