import assert_string from "./helper/assert_string";
import get_landline_number_pattern from "./helper/get_landline_number_pattern";
import sanitise_string from "./helper/sanitise_string";
import { CountryCodeOption, Region } from "./helper/type/types";

interface LandlineNumberOptions {
    allowedRegions?: Region[],
    countryCode?: CountryCodeOption
}

/**
 * Returns whether the given mozambican landline number is valid or not.
 * 
 * @param {string} num the number to check
 * @returns true if valid, otherwise false.
 */
const isLandlineNumberValid = (num: string, options?: LandlineNumberOptions) => {
    // Assert argument is string.
    assert_string(num);

    // Sanitise the number:
    num = sanitise_string(num);

    // Parse the options
    options = options || {};
    // Defaults
    const allowedRegions = options.allowedRegions || [];
    const countryCode = options.countryCode || "optional";

    const patt = get_landline_number_pattern(countryCode, allowedRegions);
    return patt.test(num);
};

export default isLandlineNumberValid;