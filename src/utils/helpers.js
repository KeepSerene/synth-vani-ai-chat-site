const getCurrentYear = () => new Date().getFullYear();

/**
 * Generates a unique alphanumeric ID.
 *
 * This function creates a random string using `Math.random()`,
 * converts it to a base-36 string, removes the leading "0.",
 * and appends the current timestamp in base-36 format to ensure uniqueness.
 *
 * @returns {string} A unique identifier.
 */
const generateId = () => {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
};

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
