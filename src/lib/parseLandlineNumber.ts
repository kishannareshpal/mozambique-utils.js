import assert_string from "./helper/assert_string";
import ndc_to_landline_region from "./helper/ndc_to_landline_region";
import ndc_to_operator from "./helper/ndc_to_operator";
import { LandlinePattern } from "./helper/constant/Patterns";
import ResultInterface from "./helper/interface/ResultInterface";
import { LineType, NetworkOperatorSpec } from "./helper/type/types";
import sanitise_string from "./helper/sanitise_string";


/**
 * Response type for this validation
 */
type LandlineNumberSpec = {
    number: string,
    localFormat: string,
    internationalFormat: string,
    includesCountryCode: boolean,
    nationalDestinationCode: string,
    operator: NetworkOperatorSpec,
    region: string,
    lineType: LineType,
}


/**
 * Validates any mozambican landline number 
 * (in pt we call telefone fixo)
 * 
 * @param num The landline number to check.
 * 
 * @returns a result object containing if the requested `num` is valid or not and some extra information.
 * @throws if the provided argument is not of type string.
 */
const parseLandlineNumber = (num: string): ResultInterface<LandlineNumberSpec> => {
    // Assert string
    assert_string(num);

    // Sanitise the number
    num = sanitise_string(num);

    /**
     * Is the landline number a valid mozambican one?
     * @type {boolean}
     */
    let valid = false;

    /**
     * More information related to the landline number when it is valid.
     * @type {LandlineNumberSpec | null}
     */
    let data: LandlineNumberSpec = null;

    // The check through regex of the provided number.
    const matched = num.match(LandlinePattern);
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
         * It the 8 digit phone number (including the NDC) that people can use to call others locally, 
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
         * Also refered as the Area code. E.g: 21, 293, etc..
         * These are the leading digits of the National (Significant) Number.
         * @type {string}
         */
        // Note: matched[4] is returned when the ndc has 3 digits, otherwise the 2 digit one can be found on matched[7]
        const nationalDestinationCode: string = matched[4] ? matched[4] : matched[7]; 
        
        /**
         * The city where the `nationalDestinationCode` aka Area code, is of.
         * @type {string}
         */
        const region: string | undefined = ndc_to_landline_region(nationalDestinationCode);

        /**
         * The incumbent fixed operator (Tmcel)
         * @type {NetworkOperatorSpec | null}
         */
        const operator: NetworkOperatorSpec | null = ndc_to_operator(nationalDestinationCode); // the network operator.
        
        /**
         * The type of line the phone number is of.
         * Will always be landline for this method.
         * @constant
         * @type {LineType}
         */
        const lineType: LineType = "landline";

        data = {
            number,
            localFormat,
            internationalFormat,
            includesCountryCode,
            nationalDestinationCode,
            operator,
            region,
            lineType,
        };
    }

    return {
        valid,
        data
    };
};

export default parseLandlineNumber;