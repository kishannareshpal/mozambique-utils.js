
/**
 * Network Operator
 * of all in mozambique
 */
export type NetworkOperator = "vodacom" | "movitel" | "tmcel";

export type NetworkOperatorSpec = {
  name: string,
  shortName: string
}


/**
 * Network Destination Code
 * of all mobile network operators in mozambique.
 */
export type MobileNDC = 
      "82" // tmcel reserved
    | "83" // tmcel reserved
    | "84" // vodacom reserved
    | "85" // vodacom reserved
    | "86" // movitel reserverd
    | "87"; // movitel reserved

/**
 * Network Destination Code
 * for landlines in all areas of mozambique.
 */
export type LandlineNDC =
      "251" // Manica
    | "252" // Tete
    | "258" // Vilanculos
    | "271" // Lichinga
    | "272" // Pemba
    | "281" // Chókwe
    | "282" // Xai-Xai
    | "293" // Inhambane
    | "21"  // Maputo
    | "23"  // Beira
    | "24"  // Quelimane
    | "26";  // Nampula
    // "250" // TDM - VSAT (not supported on this lib for now - not enough info found - contrib with a PR if u can)


/**
 * Network Destination Code
 * for both line types, Mobile and Landline
 */
export type NDC = MobileNDC | LandlineNDC;


export type Region = 
      "manica"
    | "tete"
    | "vilanculos"
    | "lichinga"
    | "pemba"
    | "chokwe"
    | "xaixai"
    | "inhambane"
    | "maputo"
    | "beira"
    | "quelimane"
    | "nampula";


/**
 * Line Type
 * The line types available in Mozambique.
 */
export type LineType = "mobile" | "landline";

export type CountryCodeOption = "optional" | "required" | "off";