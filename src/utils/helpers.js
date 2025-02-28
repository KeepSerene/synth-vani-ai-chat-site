const getCopyrightYear = () => new Date().getFullYear();

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

export { getCopyrightYear, generateId };
