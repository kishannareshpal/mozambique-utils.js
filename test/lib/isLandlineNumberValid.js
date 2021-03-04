const { expect } = require("chai");
const mu = require('../mozambique-utils');

describe("#isLandlineNumberValid", () => {
    it("should throw if the first argument (number) is not of type string", () => {
        expect(() => mu.isLandlineNumberValid([21123456])).to.throw();
        expect(() => mu.isLandlineNumberValid({})).to.throw();
        expect(() => mu.isLandlineNumberValid(-21123456)).to.throw();
        expect(() => mu.isLandlineNumberValid(function () { })).to.throw();
        expect(() => mu.isLandlineNumberValid(2.123456)).to.throw();
        expect(() => mu.isLandlineNumberValid(21123456)).to.throw();
    })


    it("should return true for valid landline number from Maputo", () => {
        expect(mu.isLandlineNumberValid("+25821123456")).to.be.true;
        expect(mu.isLandlineNumberValid("0025821123456")).to.be.true;
        expect(mu.isLandlineNumberValid("25821123456")).to.be.true;
        expect(mu.isLandlineNumberValid("21123456")).to.be.true;
    });

    it("should return true for valid landline number from Beira", () => {
        expect(mu.isLandlineNumberValid("+25823123456")).to.be.true;
        expect(mu.isLandlineNumberValid("0025823123456")).to.be.true;
        expect(mu.isLandlineNumberValid("25823123456")).to.be.true;
        expect(mu.isLandlineNumberValid("23123456")).to.be.true;
    });

    it("should return true for valid landline number from Quelimane", () => {
        expect(mu.isLandlineNumberValid("+25824123456")).to.be.true;
        expect(mu.isLandlineNumberValid("0025824123456")).to.be.true;
        expect(mu.isLandlineNumberValid("25824123456")).to.be.true;
        expect(mu.isLandlineNumberValid("24123456")).to.be.true;
    });

    it("should return true for valid landline number from Nampula", () => {
        expect(mu.isLandlineNumberValid("+25826123456")).to.be.true;
        expect(mu.isLandlineNumberValid("0025826123456")).to.be.true;
        expect(mu.isLandlineNumberValid("25826123456")).to.be.true;
        expect(mu.isLandlineNumberValid("26123456")).to.be.true;
    });

    it("should return true for valid landline number from Manica", () => {
        expect(mu.isLandlineNumberValid("+25825112345")).to.be.true;
        expect(mu.isLandlineNumberValid("0025825112345")).to.be.true;
        expect(mu.isLandlineNumberValid("25825112345")).to.be.true;
        expect(mu.isLandlineNumberValid("25112345")).to.be.true;
    });


    it("should return true for valid landline number from Tete", () => {
        expect(mu.isLandlineNumberValid("+25825212345")).to.be.true;
        expect(mu.isLandlineNumberValid("0025825212345")).to.be.true;
        expect(mu.isLandlineNumberValid("25825212345")).to.be.true;
        expect(mu.isLandlineNumberValid("25212345")).to.be.true;
    });

    it("should return true for valid landline number from Vilanculos", () => {
        expect(mu.isLandlineNumberValid("+25825812345")).to.be.true;
        expect(mu.isLandlineNumberValid("0025825812345")).to.be.true;
        expect(mu.isLandlineNumberValid("25825812345")).to.be.true;
        expect(mu.isLandlineNumberValid("25812345")).to.be.true;
    });

    it("should return true for valid landline number from Lichinga", () => {
        expect(mu.isLandlineNumberValid("+25827112345")).to.be.true;
        expect(mu.isLandlineNumberValid("0025827112345")).to.be.true;
        expect(mu.isLandlineNumberValid("25827112345")).to.be.true;
        expect(mu.isLandlineNumberValid("27112345")).to.be.true;
    });

    it("should return true for valid landline number from Pemba", () => {
        expect(mu.isLandlineNumberValid("+25827212345")).to.be.true;
        expect(mu.isLandlineNumberValid("0025827212345")).to.be.true;
        expect(mu.isLandlineNumberValid("25827212345")).to.be.true;
        expect(mu.isLandlineNumberValid("27212345")).to.be.true;
    });

    it("should return true for valid landline number from Chokwe", () => {
        expect(mu.isLandlineNumberValid("+25828112345")).to.be.true;
        expect(mu.isLandlineNumberValid("0025828112345")).to.be.true;
        expect(mu.isLandlineNumberValid("25828112345")).to.be.true;
        expect(mu.isLandlineNumberValid("28112345")).to.be.true;
    });

    it("should return true for valid landline number from Xai-Xai", () => {
        expect(mu.isLandlineNumberValid("+25828212345")).to.be.true;
        expect(mu.isLandlineNumberValid("0025828212345")).to.be.true;
        expect(mu.isLandlineNumberValid("25828212345")).to.be.true;
        expect(mu.isLandlineNumberValid("28212345")).to.be.true;
    });

    it("should return true for valid landline number from Inhambane", () => {
        expect(mu.isLandlineNumberValid("+25829312345")).to.be.true;
        expect(mu.isLandlineNumberValid("0025829312345")).to.be.true;
        expect(mu.isLandlineNumberValid("25829312345")).to.be.true;
        expect(mu.isLandlineNumberValid("29312345")).to.be.true;
    });




    it("should return false for any invalid mozambican landline mobile number", () => {
        expect(mu.isLandlineNumberValid("20123456")).to.be.false;
        expect(mu.isLandlineNumberValid("240")).to.be.false;
        expect(mu.isLandlineNumberValid("13435")).to.be.false;
        expect(mu.isLandlineNumberValid("32554062")).to.be.false;
        expect(mu.isLandlineNumberValid("3423@wex")).to.be.false;
        expect(mu.isLandlineNumberValid("21424a23")).to.be.false;
    });

    it("should return true for a valid number even if it contains whitespace", () => {
        expect(mu.isLandlineNumberValid("00 258 21123456")).to.be.true;
        expect(mu.isLandlineNumberValid("+258 21 123 456")).to.be.true;
        expect(mu.isLandlineNumberValid(" 2 1 1 2 3 4 5 6 ")).to.be.true;
    })

    it("should return true for a valid number even if it contains dashes", () => {
        expect(mu.isLandlineNumberValid("00-258-29312345")).to.be.true;
        expect(mu.isLandlineNumberValid("+258-293-123-45")).to.be.true;
        expect(mu.isLandlineNumberValid("2-5-8-293-12-3-45")).to.be.true;
    })

    it("should return true when the number matches one of options.allowedRegions", () => {
        expect(mu.isLandlineNumberValid("271 209-45", {
            allowedRegions: ["inhambane", "lichinga"]
        })).to.be.true

        expect(mu.isLandlineNumberValid("29320123", {
            allowedRegions: ["inhambane", "lichinga"]
        })).to.be.true

        expect(mu.isLandlineNumberValid("23-234-244", {
            allowedRegions: ["beira"]
        })).to.be.true
    })

    it("should return false when the number does not match any of the options.allowedRegions", () => {
        expect(mu.isLandlineNumberValid("21-201-320", {
            allowedRegions: ["inhambane", "chokwe"]
        })).to.be.false

        expect(mu.isLandlineNumberValid("29320324", {
            allowedRegions: ["manica"]
        })).to.be.false
    })


    it("should return true when options.countryCode is 'optional' and number either includes or not the country code", () => {
        expect(mu.isLandlineNumberValid("+25825120324", {
            countryCode: "optional"
        })).to.be.true

        expect(mu.isLandlineNumberValid("0025825120324", {
            countryCode: "optional"
        })).to.be.true

        expect(mu.isLandlineNumberValid("25825120324", {
            countryCode: "optional"
        })).to.be.true

        expect(mu.isLandlineNumberValid("25120324", {
            countryCode: "optional"
        })).to.be.true
    })

    it("should return true when options.countryCode is 'off' and number does not include the country code", () => {
        expect(mu.isLandlineNumberValid("25120324", {
            countryCode: "off"
        })).to.be.true
    });

    it("should return false when options.countryCode is 'off' and number includes the country code", () => {
        expect(mu.isLandlineNumberValid("+25825120324", {
            countryCode: "off"
        })).to.be.false

        expect(mu.isLandlineNumberValid("0025825120324", {
            countryCode: "off"
        })).to.be.false

        expect(mu.isLandlineNumberValid("25825120324", {
            countryCode: "off"
        })).to.be.false
    });


    it("should return true when options.countryCode is 'required' and number includes the country code", () => {
        expect(mu.isLandlineNumberValid("+25825120324", {
            countryCode: "required"
        })).to.be.true

        expect(mu.isLandlineNumberValid("0025825120324", {
            countryCode: "required"
        })).to.be.true

        expect(mu.isLandlineNumberValid("25825120324", {
            countryCode: "required"
        })).to.be.true
    });

    it("should return false when options.countryCode is 'required' and number does not include the country code", () => {
        expect(mu.isLandlineNumberValid("25120324", {
            countryCode: "required"
        })).to.be.false
    });
});