import { LandlineNDCPattern, TmcelNDCPattern, VodacomNDCPattern, MovitelNDCPattern } from "./constant/Patterns";
import assert_string from "./assert_string";
import { NDC, NetworkOperatorSpec } from "./type/types";

/**
 * Get the network operator from any mozambican valid `ndc` (National Destination Code),
 * which can be, for example, 21, 293, 84, 85, 86, etc...
 * 
 * @param ndc The national destination code (E.g: 82, 84 or 293) to check for.
 * @throws if the provided ndc is not of type string
 * @returns {NetworkOperatorSpec} network operator information.
 */
const ndc_to_operator = (ndc: NDC | string): NetworkOperatorSpec | null => {
    assert_string(ndc);

    if (VodacomNDCPattern.test(ndc)) {
        return {
            name: "Vodacom Moçambique",
            shortName: "Vodacom"
        };
    
    } else if (MovitelNDCPattern.test(ndc)){
        return {
            name: "Movitel, S.A.",
            shortName: "Movitel"
        };

    } else if (TmcelNDCPattern.test(ndc) || LandlineNDCPattern.test(ndc)) {
        return {
            name: "Moçambique Telecom, S.A.",
            shortName: "Tmcel"
        };
        
    } else {
        return null;
    }
};

export default ndc_to_operator;