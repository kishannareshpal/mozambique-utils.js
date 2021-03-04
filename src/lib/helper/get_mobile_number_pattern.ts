import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { NDC_MOBILE_SUFFIX } from "./constant/Patterns";
import { CountryCodeOption } from "./type/types";

/**
 * Get a customized mobile number regex pattern
 * 
 * @param countryCode If the country code should by
 * @param operators a string of operators to allow. Provide an empty array for all operators.
 * @returns the customized regex that can be used to test a number.
 */
const get_mobile_number_pattern = (countryCodeOpt: CountryCodeOption, operators: string[]): RegExp => {
    let countryCodePreffix: string;
    switch (countryCodeOpt) {
    case "required":
        // Must have a country code.
        countryCodePreffix = "((\\+|00)?258)";
        break;

    case "off":
        // Must not have country code in it.
        countryCodePreffix = "()";
        break;
    
    case "optional":
    default:
        // Optional. Can have a country code or not!
        countryCodePreffix = "((\\+|00)?258)?";
        break;
    }
    
    let ndcSuffix: string;
    if (!isEmpty(operators)) {
        // For a list of operators
        operators.forEach(operator => {
            const sfx = get(NDC_MOBILE_SUFFIX, operator);
            if (sfx) {
                ndcSuffix += sfx;
            }
        });
        
    } else {
        // For all operators by default
        ndcSuffix = NDC_MOBILE_SUFFIX.all;
    }
    return new RegExp(`^${countryCodePreffix}((8[${ndcSuffix}])\\d{7})$`);
};

export default get_mobile_number_pattern;