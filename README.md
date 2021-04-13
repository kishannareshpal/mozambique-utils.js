# mozambique-utils.js

Easy to use parsers and validators for mozambican (🇲🇿) data-type formatted strings.

[![npm](https://img.shields.io/npm/v/mozambique-utils)](https://npmjs.com/mozambique-utils)

## Table of contents

-   [Instalation and Usage](#instalation-and-usage)
    -   [NPM](#npm)
    -   [Client-side](#client-side)
-   [API](#api)
    <!-- isLandlineNumberValid(number [, options]) -->
    -   [`isLandlineNumberValid`](#islandlinenumbervalidnumber--options)
    -   [`isMobileNumberValid`](#ismobilenumbervalidnumber--options)
    -   [`isNUITValid`](#isnuitvalidnuit)
    -   [`isIBANValid`](#isibanvalidiban)
    -   [`parseMobileNumber`](#parsemobilenumbernumber)
    -   [`parseLandlineNumber`](#parselandlinenumbernumber)
-   [Contributing](#contributing)

## Instalation and Usage

#### Using npm

```bash
npm install mozambique-utils
```

```javascript
const mozambiqueUtils = require("mozambique-utils"); // -> No ES6
// import mozambiqueUtils from "mozambique-utils";   // -> or with ES6

mozambiqueUtils.isNUITValid("300010125"); //-> true
```

#### In a browser

This library can be loaded as a standalone script, which will then be made available through the `mozambiqueUtils` global object.

```html
<script src="https://unpkg.com/mozambique-utils@1.1.0/dist/mozambique-utils.js"></script>
<!-- 
    Or use the minified version:
    <script src="https://unpkg.com/mozambique-utils@1.1.0/dist/mozambique-utils.min.js"></script>
-->

<script type="text/javascript">
	mozambiqueUtils.isNUITValid("300010125"); //=> true
</script>
```

## API

### `isLandlineNumberValid(number [, options])`

Check if a string is a valid mozambican landline number.
Returns `true` if valid, otherwise `false`.

###### number

The number to check. Must be of type string and can contain dashes or spaces.\
Will throw if not of type string.

###### options

An object that defaults to:

```javascript
{
	allowedRegions: [],
    countryCode: "optional"
}
```

| Option         | Type     | Accepted value(s)                                                                                                                | Description                                                                                                                                                                                                                                                                                            |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowedRegions | string[] | `tete` , `pemba`, `beira`, `chokwe`, `manica`, `xaixai`, `maputo`, `nampula`, `lichinga`, `inhambane`, `quelimane`, `vilanculos` | List of regions to limit the validation on. If passed an emtpy array, it will validate for all regions.                                                                                                                                                                                                |
| countryCode    | string   | `optional`, `required`, `off`                                                                                                    | `optional`: the country code in the number being validated is optional.<br>`required` only return true if the number includes the country code.<br>`off` only return true if the number does not include the country code.<br><br>The country code can be in either `+258` or `00258` or `258` format. |

##### Examples:

```javascript
mutils.isLandlineNumberValid("21201321"); //=> true
mutils.isLandlineNumberValid("21 203 123"); //=> true
mutils.isLandlineNumberValid("26-203-123"); //=> true
mutils.isLandlineNumberValid("+25824201321"); //=> true
mutils.isLandlineNumberValid("0025829320123"); //=> true
mutils.isLandlineNumberValid("25828123230"); //=> true

mutils.isLandlineNumberValid("841234567"); //=> false

mutils.isLandlineNumberValid("21201321", {
	allowedRegions: ["beira", "tete", "chokwe"],
}); //=> false

mutils.isLandlineNumberValid("+25821201321", {
	allowedRegions: ["maputo"],
	countryCode: "required",
}); //=> true

mutils.isLandlineNumberValid("+25821201321", {
	countryCode: "off",
}); //=> false
```

### `isMobileNumberValid(number [, options])`

Check if a string is a valid mozambican mobile number.\
Will throw if not of type string.\
Returns `true` if valid, otherwise `false`.

###### number

The mobile number to check. Must be of type string and can contain dashes or spaces.\
Will throw if not of type string.

###### options

An object that defaults to:

```javascript
{
	allowedOperators: [],
    countryCode: "optional"
}
```

| Option           | Type     | Accepted value(s)             | Description                                                                                                                                                                                                                                                                                            |
| ---------------- | -------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowedOperators | string[] | `vodacom`, `tmcel`, `movitel` | List of mobile network operators to limit the validation on. If passed an emtpy array, it will validate for all network operators.                                                                                                                                                                     |
| countryCode      | string   | `optional`, `required`, `off` | `optional`: the country code in the number being validated is optional.<br>`required` only return true if the number includes the country code.<br>`off` only return true if the number does not include the country code.<br><br>The country code can be in either `+258` or `00258` or `258` format. |

##### Examples:

```javascript
mutils.isMobileNumberValid("821234567"); //=> true
mutils.isMobileNumberValid("84 123 4567"); //=> true
mutils.isMobileNumberValid("84-123-4567"); //=> true
mutils.isMobileNumberValid("+258841234567"); //=> true
mutils.isMobileNumberValid("00258861234567"); //=> true
mutils.isMobileNumberValid("258871234567"); //=> true

mutils.isMobileNumberValid("811234567"); //=> false

mutils.isMobileNumberValid("841234567", {
	allowedOperators: ["tmcel", "movitel"],
}); //=> false

mutils.isMobileNumberValid("+258841234567", {
	allowedOperators: ["vodacom"],
	countryCode: "required",
}); //=> true

mutils.isMobileNumberValid("+258841234567", {
	countryCode: "off",
}); //=> false
```

### `isNUITValid(nuit)`

Check if a string is a valid mozambican [Número Único de Identificação Tributária (Taxpayer's Single Identification Number)](http://www.at.gov.mz/por/Perguntas-Frequentes2/NUIT).
Returns `true` if valid, otherwise `false`.

###### nuit

The nuit number to check. Must be of type string and can contain dashes or spaces.\
Will throw if not of type string.

##### Examples:

```javascript
mutils.isNUITValid("12345678"); //=> true
mutils.isNUITValid("1343"); //=> false
mutils.isNUITValid("348908989092"); //=> false
```

### `isIBANValid(iban)`

Check if a string is a valid mozambican formatted [International Bank Account Number - IBAN](https://en.wikipedia.org/wiki/International_Bank_Account_Number).\
Returns `true` for a valid mozambican formatted IBAN according to the [ISO 13616](https://www.iso.org/standard/81090.html), otherwise `false`.

###### iban

The mozambican iban to check.\
Must be of type string and can contain dashes or spaces.\
Will throw if not of type string.

##### Examples:

```javascript
// An example of a valid mozambican IBAN
// MZ59000301080016367102371

mutils.isIBANValid("MZ59000301080016367102371"); //=> true
mutils.isIBANValid("GB98BARC20032669387723"); //=> false
```

### `parseMobileNumber(number)`

Parse any mozambican mobile number. Returns:

```javascript
{
	valid: boolean, // if the number being parsed is valid or not
	data: {
		number: string, // the number being parsed.
		localFormat: string, // the number being parsed, formatted for national usage.
		internationalFormat: string, // the number being parsed, formatted for international usage.
		includesCountryCode: boolean, // does the number being parsed contain country code?
		nationalDestinationCode: string, // the national destination code of the network operator.
		operator: {
			name: string, // long name of the network operator.
			shortname: string // short name of the network operator.
		},
		lineType: "mobile" // the type of the line of the number being parsed.
	}
}
```

When an invalid number is parsed, the value of `data` in the return object will be `null`.

###### number

The mobile number to check. Must be of type string and can contain dashes or spaces.

##### Examples:

```javascript
mutils.parseMobileNumber("+258-84123456");
/*
    {
        valid: true
        data: {
            number: "+258-84123456",
            localFormat: "84123456",
            internationalFormat: "+25884123456",
            includesCountryCode: true,
            nationalDestinationCode: "84"
            operator: {
                name: "Vodacom Moçambique"
                shortname: "Vodacom" 
            },
            lineType: "mobile"
        }
    }
*/

mutils.parseMobileNumber("83123456");
/*
    {
        valid: true
        data: {
            number: "83123456",
            localFormat: "83123456",
            internationalFormat: "+25883123456",
            includesCountryCode: false,
            nationalDestinationCode: "83"
            operator: {
                name: "Moçambique Telecom, S.A."
                shortname: "Tmcel" 
            },
            lineType: "mobile"
        }
    }
*/

mutils.parseMobileNumber("8102392");
/*
    {
        valid: false
        data: null
    }
*/
```

### `parseLandlineNumber(number)`

Parse any mozambican landline number. Returns:

```javascript
{
	valid: boolean, // if the number being parsed is valid or not
	data: {
		number: string, // the number being parsed.
		localFormat: string, // the number being parsed, formatted for national usage.
		internationalFormat: string, // the number being parsed, formatted for international usage.
		includesCountryCode: boolean, // does the number being parsed contain country code?
		nationalDestinationCode: string, // the area code.
		operator: {
			name: string, // long name of the network operator.
			shortname: string // short name of the network operator.
		},
        region: string // the region where the (national destination code) area code is linked to.
		lineType: "mobile" // the type of the line of the number being parsed.
	}
}

```

When an invalid number is parsed, the value of `data` in the return object will be `null`.

###### number

The mobile number to check. Must be of type string and can contain dashes or spaces.\
Will throw if not of type string.

##### Examples:

```javascript
mutils.parseLandlineNumber("+258 21 351100");
/*
    {
        valid: true
        data: {
            number: "+258 21 351100",
            localFormat: "21351100",
            internationalFormat: "+25821351100",
            includesCountryCode: true,
            nationalDestinationCode: "21"
            operator: {
                name: "Moçambique Telecom, S.A."
                shortname: "Tmcel" 
            },
            region: "maputo"
            lineType: "landline"
        }
    }
*/

mutils.parseLandlineNumber("29320123");
/*
    {
        valid: true
        data: {
            number: "29320123",
            localFormat: "29320123",
            internationalFormat: "+25829320123",
            includesCountryCode: false,
            nationalDestinationCode: "293"
            operator: {
                name: "Moçambique Telecom, S.A."
                shortname: "Tmcel" 
            },
            region: "inhambane"
            lineType: "landline"
        }
    }
*/

mutils.parseLandlineNumber("841234567");
/*
    {
        valid: false
        data: null
    }
*/
```

## Contributing

##### Bug Reports & Feature Requests

Please use the issue tracker to report any bugs or file feature requests.

##### Developing

PRs are welcome. To begin developing, do this:

```bash
$ git clone https://github.com/kishannareshpal/mozambique-utils.git
$ cd mozambique-utils/
$ npm install

# Test
$ npm test
```

`npm run build` builds the library to dist, generating three main files (and also a minified version for each one with the `*.min.js` prepended):

-   `dist/mozambique-utils.cjs.js` A CommonJS bundle, suitable for use in Node.js, that requires the external dependency. This corresponds to the "main" field in package.json
-   `dist/mozambique-utils.esm.js` an ES module bundle, suitable for use in other people's libraries and applications, that imports the external dependency. This corresponds to the "module" field in package.json
-   `dist/mozambique-utils.js` a UMD build, suitable for use in any environment (including the browser, as a `<script>` tag), that includes the external dependency. This corresponds to the `"browser"` field in package.json

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change using [`rollup.watch`](https://rollupjs.org/guide/en/#rollupwatch).

`npm test` builds the library, then tests it.

## License

MIT © [Kishan Jadav](https://kishanjadav.com)
