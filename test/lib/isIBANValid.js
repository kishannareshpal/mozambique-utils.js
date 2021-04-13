const { expect } = require("chai");
const mu = require("../mozambique-utils");

describe("#isIBANValid", () => {
    it("should throw if the argument (iban) is not of type string", () => {
        expect(() => mu.isIBANValid([MZ59000301080016367102371])).to.throw();
        expect(() => mu.isIBANValid({})).to.throw();
        expect(() => mu.isIBANValid(-MZ59000301080016367102371)).to.throw();
        expect(() => mu.isIBANValid(function () { })).to.throw();
        expect(() => mu.isIBANValid(true)).to.throw();
        expect(() => mu.isIBANValid(5.9000301080016367102371)).to.throw();
        expect(() => mu.isIBANValid(MZ59000301080016367102371)).to.throw();
    })

    it("should return true if provided an ISO 13616-compliant mozambican IBAN format, even if it contains spaces or dashes as separators", () => {
        expect(mu.isIBANValid("MZ59000301080016367102371")).to.be.true;
        expect(mu.isIBANValid("MZ58445993218319128377176")).to.be.true;
        expect(mu.isIBANValid("MZ08279879699161434658257")).to.be.true;
        expect(mu.isIBANValid("MZ84293185633973254354212")).to.be.true;
        expect(mu.isIBANValid("MZ 59000 30108 00163 67102 371")).to.be.true;
        expect(mu.isIBANValid("MZ-59000 30108 00163 67102 371")).to.be.true;
        expect(mu.isIBANValid("MZ-59000-30108-00163-67102-371")).to.be.true;
    })

    it("should return false if the provided is not an ISO 13616-compliant mozambican IBAN format (anything else)", () => {
        expect(mu.isIBANValid("CI86R46891553649491647218211")).to.be.false;
        expect(mu.isIBANValid("GB98BARC20032669387723")).to.be.false;
        expect(mu.isIBANValid("VG29FDHS7712834965177877")).to.be.false;
        expect(mu.isIBANValid("0059000301080016367102371")).to.be.false;
        expect(mu.isIBANValid("1234567890123456789012345")).to.be.false;
        expect(mu.isIBANValid("")).to.be.false;
    })

});