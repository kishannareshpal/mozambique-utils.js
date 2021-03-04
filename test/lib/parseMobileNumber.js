const { expect } = require("chai");
const mu = require("../mozambique-utils");

describe("#parseMobileNumber", () => {

    it("should throw if the first argument (number) is not of type string", () => {
        expect(() => mu.parseMobileNumber([1234567])).to.throw();
        expect(() => mu.parseMobileNumber({})).to.throw();
        expect(() => mu.parseMobileNumber(-1)).to.throw();
        expect(() => mu.parseMobileNumber(function () { })).to.throw();
        expect(() => mu.parseMobileNumber(0.1234)).to.throw();
        expect(() => mu.parseMobileNumber(1234567)).to.throw();
    })

    it("should parse any valid mobile number and return its data", () => {
        expect(mu.parseMobileNumber("841234567")).to.be.an("object").that.deep.equal({
            valid: true,
            data: {
                number: "841234567",
                localFormat: "841234567",
                internationalFormat: "+258841234567",
                includesCountryCode: false,
                nationalDestinationCode: "84",
                operator: {
                    name: "Vodacom Moçambique",
                    shortName: "Vodacom"
                },
                lineType: "mobile"
            }
        })

        expect(mu.parseMobileNumber("+258822340193")).to.be.an("object").that.deep.equal({
            valid: true,
            data: {
                number: "+258822340193",
                localFormat: "822340193",
                internationalFormat: "+258822340193",
                includesCountryCode: true,
                nationalDestinationCode: "82",
                operator: {
                    name: "Moçambique Telecom, S.A.",
                    shortName: "Tmcel"
                },
                lineType: "mobile"
            }
        })

        expect(mu.parseMobileNumber("258872493849")).to.be.an("object").that.deep.equal({
            valid: true,
            data: {
                number: "258872493849",
                localFormat: "872493849",
                internationalFormat: "+258872493849",
                includesCountryCode: true,
                nationalDestinationCode: "87",
                operator: {
                    name: "Movitel, S.A.",
                    shortName: "Movitel"
                },
                lineType: "mobile"
            }
        })

        expect(mu.parseMobileNumber("00258832304393")).to.be.an("object").that.deep.equal({
            valid: true,
            data: {
                number: "00258832304393",
                localFormat: "832304393",
                internationalFormat: "+258832304393",
                includesCountryCode: true,
                nationalDestinationCode: "83",
                operator: {
                    name: "Moçambique Telecom, S.A.",
                    shortName: "Tmcel"
                },
                lineType: "mobile"
            }
        })
    });


    it("should return not valid for any invalid mobile number", () => {
        expect(mu.parseMobileNumber("29343023")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        }, "why fail 1")

        expect(mu.parseMobileNumber("+258010320392")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        }, "why fail 2")

        expect(mu.parseMobileNumber("sr258843492301")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        }, "why fail 3")

        expect(mu.parseMobileNumber("123")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        }, "why fail 4")

        expect(mu.parseMobileNumber("abc")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        }, "why fail 5")
    })


    it("should parse a valid mobile number even if it contains whitespace", () => {
        expect(mu.parseMobileNumber("+258 84 123 4567")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseMobileNumber("00 258 87 20 123 23")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseMobileNumber("2 5 8 82 932 0123")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseMobileNumber("8 5 3 2 0 1 2 3 2")).to.be.an("object").that.have.property("valid", true);
    })


    it("should parse a valid mobile number even if it contains dashes", () => {
        expect(mu.parseMobileNumber("+258-84-2320123")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseMobileNumber("00-258-84-234-20-12")).to.be.an("object").that.have.property("valid", true);
    })


    it("should parse a valid vodacom number", () => {
        // 84
        expect(mu.parseMobileNumber("+258841234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "84",
            "data.lineType": "mobile",
            "data.operator.name": "Vodacom Moçambique",
            "data.operator.shortName": "Vodacom"
        })
        expect(mu.parseMobileNumber("00258841234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "84",
            "data.lineType": "mobile",
            "data.operator.name": "Vodacom Moçambique",
            "data.operator.shortName": "Vodacom"
        })
        expect(mu.parseMobileNumber("258841234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "84",
            "data.lineType": "mobile",
            "data.operator.name": "Vodacom Moçambique",
            "data.operator.shortName": "Vodacom"
        })
        expect(mu.parseMobileNumber("841234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "84",
            "data.lineType": "mobile",
            "data.operator.name": "Vodacom Moçambique",
            "data.operator.shortName": "Vodacom"
        })

        // 85
        expect(mu.parseMobileNumber("+258851234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "85",
            "data.lineType": "mobile",
            "data.operator.name": "Vodacom Moçambique",
            "data.operator.shortName": "Vodacom"
        })
        expect(mu.parseMobileNumber("00258851234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "85",
            "data.lineType": "mobile",
            "data.operator.name": "Vodacom Moçambique",
            "data.operator.shortName": "Vodacom"
        })
        expect(mu.parseMobileNumber("258851234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "85",
            "data.lineType": "mobile",
            "data.operator.name": "Vodacom Moçambique",
            "data.operator.shortName": "Vodacom"
        })
        expect(mu.parseMobileNumber("851234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "85",
            "data.lineType": "mobile",
            "data.operator.name": "Vodacom Moçambique",
            "data.operator.shortName": "Vodacom"
        })
    });

    it("should return true for valid mcel number format", () => {
        // 82
        expect(mu.parseMobileNumber("+258821234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "82",
            "data.lineType": "mobile",
            "data.operator.name": "Moçambique Telecom, S.A.",
            "data.operator.shortName": "Tmcel"
        })
        expect(mu.parseMobileNumber("00258821234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "82",
            "data.lineType": "mobile",
            "data.operator.name": "Moçambique Telecom, S.A.",
            "data.operator.shortName": "Tmcel"
        })
        expect(mu.parseMobileNumber("258821234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "82",
            "data.lineType": "mobile",
            "data.operator.name": "Moçambique Telecom, S.A.",
            "data.operator.shortName": "Tmcel"
        })
        expect(mu.parseMobileNumber("821234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "82",
            "data.lineType": "mobile",
            "data.operator.name": "Moçambique Telecom, S.A.",
            "data.operator.shortName": "Tmcel"
        })

        // 83
        expect(mu.parseMobileNumber("+258831234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "83",
            "data.lineType": "mobile",
            "data.operator.name": "Moçambique Telecom, S.A.",
            "data.operator.shortName": "Tmcel"
        })
        expect(mu.parseMobileNumber("00258831234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "83",
            "data.lineType": "mobile",
            "data.operator.name": "Moçambique Telecom, S.A.",
            "data.operator.shortName": "Tmcel"
        })
        expect(mu.parseMobileNumber("258831234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "83",
            "data.lineType": "mobile",
            "data.operator.name": "Moçambique Telecom, S.A.",
            "data.operator.shortName": "Tmcel"
        })
        expect(mu.parseMobileNumber("831234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "83",
            "data.lineType": "mobile",
            "data.operator.name": "Moçambique Telecom, S.A.",
            "data.operator.shortName": "Tmcel"
        })
    });

    it("should return true for valid movitel number format", () => {
        // 86
        expect(mu.parseMobileNumber("+258861234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "86",
            "data.lineType": "mobile",
            "data.operator.name": "Movitel, S.A.",
            "data.operator.shortName": "Movitel"
        })
        expect(mu.parseMobileNumber("00258861234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "86",
            "data.lineType": "mobile",
            "data.operator.name": "Movitel, S.A.",
            "data.operator.shortName": "Movitel"
        })
        expect(mu.parseMobileNumber("258861234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "86",
            "data.lineType": "mobile",
            "data.operator.name": "Movitel, S.A.",
            "data.operator.shortName": "Movitel"
        })
        expect(mu.parseMobileNumber("861234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "86",
            "data.lineType": "mobile",
            "data.operator.name": "Movitel, S.A.",
            "data.operator.shortName": "Movitel"
        })

        // 87
        expect(mu.parseMobileNumber("+258871234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "87",
            "data.lineType": "mobile",
            "data.operator.name": "Movitel, S.A.",
            "data.operator.shortName": "Movitel"
        })
        expect(mu.parseMobileNumber("00258871234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "87",
            "data.lineType": "mobile",
            "data.operator.name": "Movitel, S.A.",
            "data.operator.shortName": "Movitel"
        })
        expect(mu.parseMobileNumber("258871234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "87",
            "data.lineType": "mobile",
            "data.operator.name": "Movitel, S.A.",
            "data.operator.shortName": "Movitel"
        })
        expect(mu.parseMobileNumber("871234567")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "87",
            "data.lineType": "mobile",
            "data.operator.name": "Movitel, S.A.",
            "data.operator.shortName": "Movitel"
        })
    });

});