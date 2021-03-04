/**
 * Wrapper for the validation response
 *
 * @name Result
 * @typeParam T the response data if available or null. 
 */
interface ResultInterface<T> {
    /** A boolean state representing the validity of the result */
    valid: boolean,
    /** More information about the result, if `valid` is true */
    data : T | null
}

export default ResultInterface;