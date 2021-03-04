const { expect } = require("chai");
const mu = require('../mozambique-utils');

describe("#isMobileNumberValid", () => {
    it("should throw if the first argument (number) is not of type string", () => {
        expect(() => mu.isMobileNumberValid([841234567])).to.throw();
        expect(() => mu.isMobileNumberValid({})).to.throw();
        expect(() => mu.isMobileNumberValid(-1)).to.throw();
        expect(() => mu.isMobileNumberValid(function () { })).to.throw();
        expect(() => mu.isMobileNumberValid(0.1234)).to.throw();
        expect(() => mu.isMobileNumberValid(841234567)).to.throw();
    })


    it("should return true for valid vodacom number format", () => {
        // 84
        expect(mu.isMobileNumberValid("+258841234567")).to.be.true;
        expect(mu.isMobileNumberValid("00258841234567")).to.be.true;
        expect(mu.isMobileNumberValid("258841234567")).to.be.true;
        expect(mu.isMobileNumberValid("841234567")).to.be.true;

        // 85
        expect(mu.isMobileNumberValid("+258851234567")).to.be.true;
        expect(mu.isMobileNumberValid("00258851234567")).to.be.true;
        expect(mu.isMobileNumberValid("258851234567")).to.be.true;
        expect(mu.isMobileNumberValid("851234567")).to.be.true;
    });

    it("should return true for valid mcel number format", () => {
        // 82
        expect(mu.isMobileNumberValid("+258821234567")).to.be.true;
        expect(mu.isMobileNumberValid("00258821234567")).to.be.true;
        expect(mu.isMobileNumberValid("258821234567")).to.be.true;
        expect(mu.isMobileNumberValid("821234567")).to.be.true;

        // 83
        expect(mu.isMobileNumberValid("+258831234567")).to.be.true;
        expect(mu.isMobileNumberValid("00258831234567")).to.be.true;
        expect(mu.isMobileNumberValid("258831234567")).to.be.true;
        expect(mu.isMobileNumberValid("831234567")).to.be.true;
    });

    it("should return true for valid movitel number format", () => {
        // 86
        expect(mu.isMobileNumberValid("+258861234567")).to.be.true;
        expect(mu.isMobileNumberValid("00258861234567")).to.be.true;
        expect(mu.isMobileNumberValid("258861234567")).to.be.true;
        expect(mu.isMobileNumberValid("861234567")).to.be.true;

        // 87
        expect(mu.isMobileNumberValid("+258871234567")).to.be.true;
        expect(mu.isMobileNumberValid("00258871234567")).to.be.true;
        expect(mu.isMobileNumberValid("258871234567")).to.be.true;
        expect(mu.isMobileNumberValid("871234567")).to.be.true;
    });


    it("should return false for any invalid mozambican mobile number", () => {
        expect(mu.isMobileNumberValid("801234567")).to.be.false;
        expect(mu.isMobileNumberValid("811234567")).to.be.false;
        expect(mu.isMobileNumberValid("881234567")).to.be.false;
        expect(mu.isMobileNumberValid("891234567")).to.be.false;

        expect(mu.isMobileNumberValid("123456789")).to.be.false;
        expect(mu.isMobileNumberValid("0258841234567")).to.be.false;
        expect(mu.isMobileNumberValid("8")).to.be.false;
        expect(mu.isMobileNumberValid("84")).to.be.false;
        expect(mu.isMobileNumberValid("841")).to.be.false;
        expect(mu.isMobileNumberValid("8412")).to.be.false;
        expect(mu.isMobileNumberValid("84123")).to.be.false;
        expect(mu.isMobileNumberValid("841234")).to.be.false;
        expect(mu.isMobileNumberValid("8412345")).to.be.false;
        expect(mu.isMobileNumberValid("84123456")).to.be.false;
        expect(mu.isMobileNumberValid("8412345678")).to.be.false;
        expect(mu.isMobileNumberValid("84123456789")).to.be.false;
    });

    it("should return true for a valid number even if it contains whitespace", () => {
        expect(mu.isMobileNumberValid("00 258 821234567")).to.be.true;
        expect(mu.isMobileNumberValid("+258 84 123 456 7")).to.be.true;
        expect(mu.isMobileNumberValid("2 5    886 12 3 456  7")).to.be.true;
        expect(mu.isMobileNumberValid("8 6 1 2 3 4 5 6 7")).to.be.true;
    })

    it("should return true for a valid number even if it contains dashes", () => {
        expect(mu.isMobileNumberValid("00-258-821234567")).to.be.true;
        expect(mu.isMobileNumberValid("+258-84-123-456-7")).to.be.true;
        expect(mu.isMobileNumberValid("2-5-886-12-3-456--7")).to.be.true;
        expect(mu.isMobileNumberValid("8-6-1-2-3-4-5-6-7")).to.be.true;
    })

    it("should return true when the number matches one of options.allowedOperators", () => {
        expect(mu.isMobileNumberValid("841234567", {
            allowedOperators: ["vodacom", "tmcel"]
        })).to.be.true

        expect(mu.isMobileNumberValid("831234567", {
            allowedOperators: ["vodacom", "tmcel"]
        })).to.be.true

        expect(mu.isMobileNumberValid("871234567", {
            allowedOperators: ["movitel"]
        })).to.be.true
    })

    it("should return false when the number does not match any of the options.allowedOperators", () => {
        expect(mu.isMobileNumberValid("861234567", {
            allowedOperators: ["vodacom", "tmcel"]
        })).to.be.false

        expect(mu.isMobileNumberValid("841234567", {
            allowedOperators: ["tmcel"]
        })).to.be.false

        expect(mu.isMobileNumberValid("821234567", {
            allowedOperators: ["movitel"]
        })).to.be.false
    })


    it("should return true when options.countryCode is 'optional' and number either includes or not the country code", () => {
        expect(mu.isMobileNumberValid("+258821234567", {
            countryCode: "optional"
        })).to.be.true

        expect(mu.isMobileNumberValid("00258841234567", {
            countryCode: "optional"
        })).to.be.true

        expect(mu.isMobileNumberValid("258841234567", {
            countryCode: "optional"
        })).to.be.true

        expect(mu.isMobileNumberValid("841234567", {
            countryCode: "optional"
        })).to.be.true
    })

    it("should return true when options.countryCode is 'off' and number does not include the country code", () => {
        expect(mu.isMobileNumberValid("821234567", {
            countryCode: "off"
        })).to.be.true

        expect(mu.isMobileNumberValid("841234567", {
            countryCode: "off"
        })).to.be.true
    });

    it("should return false when options.countryCode is 'off' and number includes the country code", () => {
        expect(mu.isMobileNumberValid("+258821234567", {
            countryCode: "off"
        })).to.be.false

        expect(mu.isMobileNumberValid("00258841234567", {
            countryCode: "off"
        })).to.be.false

        expect(mu.isMobileNumberValid("258841234567", {
            countryCode: "off"
        })).to.be.false
    });


    it("should return true when options.countryCode is 'required' and number includes the country code", () => {
        expect(mu.isMobileNumberValid("+258821234567", {
            countryCode: "required"
        })).to.be.true

        expect(mu.isMobileNumberValid("00258841234567", {
            countryCode: "required"
        })).to.be.true

        expect(mu.isMobileNumberValid("258841234567", {
            countryCode: "required"
        })).to.be.true
    });

    it("should return false when options.countryCode is 'required' and number does not include the country code", () => {
        expect(mu.isMobileNumberValid("821234567", {
            countryCode: "required"
        })).to.be.false

        expect(mu.isMobileNumberValid("841234567", {
            countryCode: "required"
        })).to.be.false

        expect(mu.isMobileNumberValid("861234567", {
            countryCode: "required"
        })).to.be.false
    });
})