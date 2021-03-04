import assert_string from "./helper/assert_string";
import get_mobile_number_pattern from "./helper/get_mobile_number_pattern";
import sanitise_string from "./helper/sanitise_string";
import { CountryCodeOption, NetworkOperator } from "./helper/type/types";


interface MobileNumberOptions {
    allowedOperators?: NetworkOperator[],
    countryCode?: CountryCodeOption
}

/**
 * Returns whether the given mozambican mobile number is valid or not.
 * 
 * @param {string} num the number to check
 * @returns true if valid, otherwise false.
 */
const isMobileNumberValid = (num: string, options?: MobileNumberOptions) => {
    // Assert argument is string.
    assert_string(num);

    // Sanitise the number:
    num = sanitise_string(num);

    // Parse the options
    options = options || {};
    // Defaults
    const allowedOperators = options.allowedOperators || [];
    const countryCode = options.countryCode || "optional";    

    const patt = get_mobile_number_pattern(countryCode, allowedOperators);
    return patt.test(num);
};

export default isMobileNumberValid;