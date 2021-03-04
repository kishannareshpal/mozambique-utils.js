const { expect } = require("chai");
const mu = require("../mozambique-utils");

describe("#parseLandlineNumber", () => {

    it("should throw if the first argument (number) is not of type string", () => {
        expect(() => mu.parseLandlineNumber([1234567])).to.throw();
        expect(() => mu.parseLandlineNumber({})).to.throw();
        expect(() => mu.parseLandlineNumber(-1)).to.throw();
        expect(() => mu.parseLandlineNumber(function () { })).to.throw();
        expect(() => mu.parseLandlineNumber(0.1234)).to.throw();
        expect(() => mu.parseLandlineNumber(1234567)).to.throw();
    })

    it("should parse any valid landline number and return its data", () => {
        expect(mu.parseLandlineNumber("29320123")).to.be.an("object").that.deep.equal({
            valid: true,
            data: {
                number: "29320123",
                localFormat: "29320123",
                internationalFormat: "+25829320123",
                includesCountryCode: false,
                nationalDestinationCode: "293",
                operator: {
                    name: "Moçambique Telecom, S.A.",
                    shortName: "Tmcel"
                },
                region: "inhambane",
                lineType: "landline"
            }
        })

        expect(mu.parseLandlineNumber("+25829320123")).to.be.an("object").that.deep.equal({
            valid: true,
            data: {
                number: "+25829320123",
                localFormat: "29320123",
                internationalFormat: "+25829320123",
                includesCountryCode: true,
                nationalDestinationCode: "293",
                operator: {
                    name: "Moçambique Telecom, S.A.",
                    shortName: "Tmcel"
                },
                region: "inhambane",
                lineType: "landline"
            }
        })

        expect(mu.parseLandlineNumber("25821020123")).to.be.an("object").that.deep.equal({
            valid: true,
            data: {
                number: "25821020123",
                localFormat: "21020123",
                internationalFormat: "+25821020123",
                includesCountryCode: true,
                nationalDestinationCode: "21",
                operator: {
                    name: "Moçambique Telecom, S.A.",
                    shortName: "Tmcel"
                },
                region: "maputo",
                lineType: "landline"
            }
        })

        expect(mu.parseLandlineNumber("0025825110123")).to.be.an("object").that.deep.equal({
            valid: true,
            data: {
                number: "0025825110123",
                localFormat: "25110123",
                internationalFormat: "+25825110123",
                includesCountryCode: true,
                nationalDestinationCode: "251",
                operator: {
                    name: "Moçambique Telecom, S.A.",
                    shortName: "Tmcel"
                },
                region: "manica",
                lineType: "landline"
            }
        })
    });


    it("should return not valid for any invalid landline number", () => {
        expect(mu.parseLandlineNumber("841234567")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        })

        expect(mu.parseLandlineNumber("+25810320392")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        })

        expect(mu.parseLandlineNumber("sr25824020392")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        })

        expect(mu.parseLandlineNumber("123")).to.be.an("object").that.deep.equal({
            valid: false,
            data: null
        })
    })


    it("should parse a valid landline number even if it contains whitespace", () => {
        expect(mu.parseLandlineNumber("+258 293 20123")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseLandlineNumber("00 258 293 20 123")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseLandlineNumber("2 5    8 2 932   0123")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseLandlineNumber("2 9 3 2 0 1 2 3")).to.be.an("object").that.have.property("valid", true);
    })


    it("should parse a valid landline number even if it contains dashes", () => {
        expect(mu.parseLandlineNumber("+258-293-20123")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseLandlineNumber("00-258-293-20-123")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseLandlineNumber("2-5-8-2-932--0123")).to.be.an("object").that.have.property("valid", true);
        expect(mu.parseLandlineNumber("2-9-3- 2-0-1-2-3")).to.be.an("object").that.have.property("valid", true);
    })


    it("should parse a valid inhambane landline number", () => {
        expect(mu.parseLandlineNumber("29320123")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "293",
            "data.region": "inhambane",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025829320123")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "293",
            "data.region": "inhambane",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25829320123")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "293",
            "data.region": "inhambane",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25829320123")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "293",
            "data.region": "inhambane",
            "data.lineType": "landline",
        })
    })


    it("should parse a valid maputo landline number", () => {
        expect(mu.parseLandlineNumber("21201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "21",
            "data.region": "maputo",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025821201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "21",
            "data.region": "maputo",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25821201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "21",
            "data.region": "maputo",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25821201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "21",
            "data.region": "maputo",
            "data.lineType": "landline",
        })
    })


    it("should parse a valid beira landline number", () => {
        expect(mu.parseLandlineNumber("23201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "23",
            "data.region": "beira",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025823201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "23",
            "data.region": "beira",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25823201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "23",
            "data.region": "beira",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25823201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "23",
            "data.region": "beira",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid quelimane landline number", () => {
        expect(mu.parseLandlineNumber("24201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "24",
            "data.region": "quelimane",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025824201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "24",
            "data.region": "quelimane",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25824201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "24",
            "data.region": "quelimane",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25824201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "24",
            "data.region": "quelimane",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid nampula landline number", () => {
        expect(mu.parseLandlineNumber("26201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "26",
            "data.region": "nampula",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025826201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "26",
            "data.region": "nampula",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25826201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "26",
            "data.region": "nampula",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25826201230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "26",
            "data.region": "nampula",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid vilanculos landline number", () => {
        expect(mu.parseLandlineNumber("25821230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "258",
            "data.region": "vilanculos",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025825812345")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "258",
            "data.region": "vilanculos",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25825820123")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "258",
            "data.region": "vilanculos",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25825801230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "258",
            "data.region": "vilanculos",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid manica landline number", () => {
        expect(mu.parseLandlineNumber("25121230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "251",
            "data.region": "manica",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025825121230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "251",
            "data.region": "manica",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25825121230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "251",
            "data.region": "manica",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25825121230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "251",
            "data.region": "manica",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid tete landline number", () => {
        expect(mu.parseLandlineNumber("25211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "252",
            "data.region": "tete",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025825211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "252",
            "data.region": "tete",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25825211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "252",
            "data.region": "tete",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25825211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "252",
            "data.region": "tete",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid lichinga landline number", () => {
        expect(mu.parseLandlineNumber("27111230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "271",
            "data.region": "lichinga",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025827111230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "271",
            "data.region": "lichinga",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25827111230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "271",
            "data.region": "lichinga",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25827111230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "271",
            "data.region": "lichinga",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid pemba landline number", () => {
        expect(mu.parseLandlineNumber("27211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "272",
            "data.region": "pemba",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025827211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "272",
            "data.region": "pemba",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25827211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "272",
            "data.region": "pemba",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25827211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "272",
            "data.region": "pemba",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid chokwe landline number", () => {
        expect(mu.parseLandlineNumber("28111230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "281",
            "data.region": "chokwe",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025828111230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "281",
            "data.region": "chokwe",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25828111230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "281",
            "data.region": "chokwe",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25828111230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "281",
            "data.region": "chokwe",
            "data.lineType": "landline",
        })
    })

    it("should parse a valid xai-xai landline number", () => {
        expect(mu.parseLandlineNumber("28211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "282",
            "data.region": "xai-xai",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("0025828211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "282",
            "data.region": "xai-xai",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("+25828211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "282",
            "data.region": "xai-xai",
            "data.lineType": "landline",
        })

        expect(mu.parseLandlineNumber("25828211230")).to.be.an("object").that.deep.nested.include({
            valid: true,
            "data.nationalDestinationCode": "282",
            "data.region": "xai-xai",
            "data.lineType": "landline",
        })
    })

});