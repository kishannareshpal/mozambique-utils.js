import assert_string from "./helper/assert_string";
import ndc_to_operator from "./helper/ndc_to_operator";
import { MobilePattern } from "./helper/constant/Patterns";
import ResultInterface from "./helper/interface/ResultInterface";
import { LineType, NetworkOperatorSpec } from "./helper/type/types";
import sanitise_string from "./helper/sanitise_string";



/**
 * Response type for this validation
 */
type MobileNumberSpec = {
    number: string,
    localFormat: string,
    internationalFormat: string,
    includesCountryCode: boolean,
    nationalDestinationCode: string,
    operator: NetworkOperatorSpec,
    lineType: LineType
}


/**
 * Validates any mozambican mobile number.
 * 
 * @param {string} num The mobile number to check for.
 * @returns {MobileNumberValidationResult} an object telling if the provided number str is valid or not. And if valid, some extra details about that number, otherwise null.
 * 
 * @throws if the provided argument is not of type string.
 */
const parseMobileNumber = (num: string): ResultInterface<MobileNumberSpec> => {
    // Assert string
    assert_string(num);

    // Sanitise the string:
    num = sanitise_string(num);

    /**
     * Is the mobile number a valid mozambican one?
     * @type {boolean}
     */
    let valid = false;

    /**
     * More information related to the landline number when it is valid.
     * @type {MobileNumberSpec | null}
     */
    let data: MobileNumberSpec = null;

    // The check through regex of the provided number.
    const matched = num.match(MobilePattern);
    if (matched) {
        // Is valid.
        valid = true;

        /**
         * The requested number
         * @type {string}
         */
        const number: string = num;

        /**
         * Does the requested number include the country code with or without the international access prefix?
         * Does it include either 258, +258, 00258
         * @type {boolean}
         */
        const includesCountryCode: boolean = matched[1] !== undefined;
        
        /**
         * The provided number in local format.
         * This is also refered as the National (Significant) Number or NSN for short.
         * 
         * It the 9 digit phone number (including the NDC) that people can use to call others locally, 
         * without the need of using the international access prefix (+|00) and/or the country code (258).
         * @type {string}
         */
        const localFormat: string = matched[3];
        
        /**
         * The provided number formatted to use for international calls.
         * This is the `localFormat` with the country code prefixed to it.
         * @type {string}
         */
        const internationalFormat = `+258${localFormat}`;

        /**
         * National destination code are the leading digits of the National (Significant) Number.
         * E.g: 82, 84, 86, etc..
         * @type {string}
         */
        const nationalDestinationCode: string = matched[4];
        
        /**
         * The network operator whose NDC is assigned to.
         * @type {NetworkOperatorSpec | null}
         */
        const operator: NetworkOperatorSpec | null = ndc_to_operator(nationalDestinationCode);
        
        /**
         * The type of line the phone number is of.
         * Will always be "mobile" for this method.
         * 
         * @constant
         * @type {LineType}
         */
        const lineType: LineType = "mobile";

        data  = {
            number,
            localFormat,
            internationalFormat,
            includesCountryCode,
            nationalDestinationCode,
            operator,
            lineType,
        };
    }

    // Return the result of the validation
    return {
        valid,
        data
    };
};

export default parseMobileNumber;