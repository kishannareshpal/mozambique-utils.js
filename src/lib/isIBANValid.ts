import assert_string from "./helper/assert_string";
import sanitise_string from "./helper/sanitise_string";
import { IBANPattern } from "./helper/constant/Patterns";

/**
 * Checks whether a mozambican International Bank Account Number (IBAN)
 * is valid through ISO 13616-compliant national IBAN format.
 * 
 * Check constraints includes:
 *  - Starts with the country code MZ
 *  - Length of 25
 *  - Applies the check character system MOD 97-10 (see ISO 7064) - (hint: should be 1)!
 * 
 * @see https://www.iso.org/standard/81090.html ISO-13616 Structure of the IBAN
 * @see https://www.iso.org/standard/31531.html ISO-7064 IT - Security Techniques - Check character systems
 * 
 * @param {string} iban the mozambican IBAN to check.
 * @returns {boolean} true if valid, otherwise false.
 */
const isIBANValid = (iban: string): boolean => {
    // Assert type string
    assert_string(iban);

    // Sanitise the iban
    iban = sanitise_string(iban);
    iban = iban.toLowerCase();
    
    if (iban) {
        // Make sure it has a length of 25 (including the two trailing country code and all)
        const isPatternValid = IBANPattern.test(iban);
        if (!isPatternValid) return false;

        // Check digits based on the scheme defined in ISO-7064 (MOD 97).
        // Move the first four chars to the right end of the iban
        const displaced = iban.substring(4, iban.length) + iban.substring(0, 4);
        
        // Convert the alpha characters to numeric characters in accordance to 6.2.3 of ISO-1316-1.
        const MZ_DIGITS = "2235";
        const numeric = displaced.replace("mz", MZ_DIGITS);
        // Calculate the modulo 97 (the remainder after division by 97) - should be 1!
        const remainder = Array.from(numeric).map(c => parseInt(c)).reduce((remainder, value) => (remainder * 10 + value) % 97,0);
        return remainder === 1;
    }
    return false;
};

export default isIBANValid;