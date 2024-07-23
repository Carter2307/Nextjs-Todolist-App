/**
 * Capitalizes the first letter of a string.
 * @param {string} inputString - The input string to capitalize.
 * @returns {string} - The input string with the first letter capitalized.
 */
String.prototype.capitalizeFirstLetter = function() {
  // Check if the input string is empty
  if (this.length === 0) {
    return ""; // Return the empty string as is
  }

  // Capitalize the first letter and concatenate it with the rest of the string
  return this.charAt(0).toUpperCase() + this.slice(1);
}


export {}