/* ------------------------------- Number Validation Patterns ------------------------------ */

/**
 * Small portion of patterns used the original number validation patterns.
 */
export const NDC_PREFIX: { [key: string]: string } = {
    mobile: "8",
    landline: "2"
};
export const NDC_MOBILE_SUFFIX: { [key: string]: string } = {
    all: "234567", // 8+all - E.g 82 83 87
    tmcel: "23", // 8+tmcel_suffix
    movitel: "67", // 8+movitel_suffix
    vodacom: "45", // 8+vodacom_suffix - E.g: 84 85
};
export const NDC_LANDLINE: { [key: string]: string } = {
    tete: "252",
    pemba: "272",
    beira: "23",
    chokwe: "281",
    manica: "251",
    xaixai: "282",
    maputo: "21",
    nampula: "26",
    lichinga: "271",
    inhambane: "293",
    quelimane: "24",
    vilanculos: "258"
};

/**
 * Matches any mozambican mobile phone number from any carrier/operator.
 * E.g: 8411224342 or +2588411224342 or 2588411224342 or even 002588411224342
 * 
 * @constant
 * @type {RegExp}
 */
export const MobilePattern = /^((\+|00)?258)?((8[234567])\d{7})$/;

/**
 * Matches any mozambican landline phone number from the incumbent fixed operator (Tmcel)
 * E.g: 21351100 or +25821351100 or 25821351100 or 0025821351100
 * 
 * @constant
 * @type {RegExp}
 */

 
 
export const LandlinePattern = /^((\+|00)?258)?((2(5[0128]|7[12]|8[12]|93))(\d{5})|(2[1346])(\d{6}))$/;

/**
 * Matches mozambican landline NDC of the incumbent fixed operator phone number (Tmcel)
 * E.g: 21 or 293 or 24 or 252, etc..
 * 
 * @see {@link https://www.itu.int/dms_pub/itu-t/oth/02/02/T02020000910003PDFE.pdf}  (page 5) for a full list of available NDC
 * @constant
 * @type {RegExp}
 */
export const LandlineNDCPattern = /^(2(5[0128]|7[12]|8[12]|93)|2[1346])$/;

/**
 * Matches Vodacom's mobile National Destination Code.
 * E.g: 84 or 85
 * 
 * @constant
 * @type {RegExp}
 */
export const VodacomNDCPattern = /^8[45]$/;

/**
 * Matches Tmcel mobile National Destination Code.
 * E.g: 82 or 83
 * 
 * @constant
 * @type {RegExp}
 */
export const TmcelNDCPattern = /^8[23]$/;

/**
 * Matches Mobitel mobile National Destination Code.
 * E.g: 86 or 87
 * 
 * @constant
 * @type {RegExp}
 */
export const MovitelNDCPattern = /^8[67]$/;



/* ------------------------------- NUIT validation patterns ------------------------------ */

/**
 * Matches mozambican Número Único de Identificação Tributária (NUIT)
 * - NUIT has 9 digits.
 */
export const NUITPattern = /^\d{9}$/;