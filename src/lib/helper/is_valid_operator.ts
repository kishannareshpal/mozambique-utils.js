import { NETWORK_OPERATORS } from "./constant/Constants";


/**
 * Checks whether or not a network operator string is a valid mozambican one.
 * 
 * @param networkOp the network operator to check
 * @returns the network operator to check
 */
const is_valid_operator = (networkOp: string): boolean => {
    if (networkOp) {
        networkOp = networkOp.toLowerCase();
        return NETWORK_OPERATORS.includes(networkOp);
    }
    return false;
};

export default is_valid_operator;