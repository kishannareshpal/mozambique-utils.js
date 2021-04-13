import { version } from "../package.json";
import parseMobileNumber from "./lib/parseMobileNumber";
import parseLandlineNumber from "./lib/parseLandlineNumber";
import isMobileNumberValid from "./lib/isMobileNumberValid";
import isNUITValid from "./lib/isNUITValid";
import isIBANValid from "./lib/isIBANValid";
import isLandlineNumberValid from "./lib/isLandlineNumberValid";


export {
    version,
    parseMobileNumber,
    parseLandlineNumber,
    isMobileNumberValid,
    isLandlineNumberValid,
    isNUITValid,
    isIBANValid
};