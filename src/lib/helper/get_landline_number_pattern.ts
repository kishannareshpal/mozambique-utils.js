import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { NDC_LANDLINE } from "./constant/Patterns";
import { CountryCodeOption, Region } from "./type/types";

const get_landline_number_pattern = (countryCodeOpt: CountryCodeOption, regions: Region[]) => {
    // Constant
    const MAXIMUM_NSN_DIGITS = 8; // maximum national signficant number digits for landlines in mozambique.

    let countryCodePreffix: string;
    switch (countryCodeOpt) {
    case "required":
        // Must have a country code
        countryCodePreffix = "((\\+|00)?258)";
        break;

    case "off":
        // Must have a country code
        countryCodePreffix = "()";
        break;
    
    case "optional":
    default:
        // Optional. Can have a country code or not!
        countryCodePreffix = "((\\+|00)?258)?";
        break;
    }

    let numPattern = "";

    if (!isEmpty(regions)) {
        // For a list of regions

        numPattern += "(";
        regions.forEach((region, index) => {
            const ndcForRegion = get(NDC_LANDLINE, region);
            const nsnLength = MAXIMUM_NSN_DIGITS - ndcForRegion.length;
            numPattern += `(${ndcForRegion})(\\d{${nsnLength}})`;

            const isLastRegionOnList = ((regions.length-1) === index);
            if (!isLastRegionOnList) {
                numPattern += "|";
            }
        });
        numPattern += ")";



    } else {
        // for all regions
        numPattern = "((2(5[0128]|7[12]|8[12]|93))(\\d{5})|(2[1346])(\\d{6}))";
    }

    return new RegExp(`^${countryCodePreffix}${numPattern}$`);
};


export default get_landline_number_pattern;