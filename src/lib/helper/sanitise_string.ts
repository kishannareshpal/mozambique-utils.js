/**
 * Sanitise a string by removing all whitespaces, dashes and commas.
 * @param str The string to sanitise
 * @returns {string} a sanitised string.
 */
const sanitise_string = (str: string): string => {
    if (str) {
        str = str.replace(/[\s-]/g, ""); // remove all whitespaces, dash and commas
    }
    return str;
};

export default sanitise_string;