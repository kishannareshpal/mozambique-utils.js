import assert_string from "./assert_string";
import { LandlineNDCPattern } from "./constant/Patterns";
import { LandlineNDC } from "./type/types";

/**
 * A list of area codes in mozambique
 * 
 * @see {@link https://www.itu.int/dms_pub/itu-t/oth/02/02/T02020000910003PDFE.pdf}
 * @see {@link https://en.wikipedia.org/wiki/Telephone_numbers_in_Mozambique}
 */
const regions: Record<string, string> = {
    "21"  : "maputo",
    "23"  : "beira",
    "24"  : "quelimane",
    "26"  : "nampula",
    "258" : "vilanculos",
    "251" : "manica",
    "252" : "tete",
    "271" : "lichinga",
    "272" : "pemba",
    "281" : "chokwe",
    "282" : "xai-xai",
    "293" : "inhambane"
};

/**
 * Get the landline region for a given mozambican National Destination Code | Area code.
 * 
 * @param ndc a valid national destination code | area code of a mozambican landline number.
 * @returns the region name (city) of the given ndc. Or null if an invalid ndc is given.
 */
const ndc_to_landline_region = (ndc: LandlineNDC | string): string | null => {
    assert_string(ndc);

    if (LandlineNDCPattern.test(ndc)) {
        return regions[ndc];
    }
    return null;
};

export default ndc_to_landline_region;