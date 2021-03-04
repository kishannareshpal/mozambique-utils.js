import isString from "lodash/isString";
/**
 * Checks if `value` is of type string
 * 
 * @param {unknwon} value The value to check.
 * @returns {boolean} true if string otherwise false.
 */

const assert_string = (value: unknown): void => {
    if(!isString(value)) {
        throw new Error("Expected a string");
    }
};

export default assert_string;