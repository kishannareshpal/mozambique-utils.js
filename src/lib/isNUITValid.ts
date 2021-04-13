import assert_string from "./helper/assert_string";
import { NUITPattern } from "./helper/constant/Patterns";
import sanitise_string from "./helper/sanitise_string";

/**
 * Check if a mozambican Número Único de Identificação Tributária (NUIT)
 * is valid or not.
 * For it to be valid, it must include 9 digits.
 * 
 * @param {string} nuit the NUIT to check
 * @returns {boolean} true if valid, otherwise false.
 */
const isNUITValid = (nuit: string): boolean => {
    // Assert type string
    assert_string(nuit);

    // Sanitise nuit
    nuit = sanitise_string(nuit);

    if (nuit) {
        return NUITPattern.test(nuit);
    }
    return false;
};

export default isNUITValid;