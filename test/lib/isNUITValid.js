const { expect } = require("chai");
const mu = require("../mozambique-utils");

describe("#isNUITValid", () => {
    it("should throw if the argument (nuit) is not of type string", () => {
        expect(() => mu.isNUITValid([1234567])).to.throw();
        expect(() => mu.isNUITValid({})).to.throw();
        expect(() => mu.isNUITValid(-1)).to.throw();
        expect(() => mu.isNUITValid(function () { })).to.throw();
        expect(() => mu.isNUITValid(0.1234)).to.throw();
        expect(() => mu.isNUITValid(false)).to.throw();
        expect(() => mu.isNUITValid(1234567)).to.throw();
    })

    it("should return true if nuit format is valid even if it contains spaces or dashes as separators", () => {
        expect(mu.isNUITValid("123456789")).to.be.true;
        expect(mu.isNUITValid("310023432")).to.be.true;
        expect(mu.isNUITValid("310 023 432")).to.be.true;
        expect(mu.isNUITValid("310-023-432")).to.be.true;
    })

    it("should return false if nuit format is invalid", () => {
        expect(mu.isNUITValid("3001")).to.be.false;
        expect(mu.isNUITValid("1243")).to.be.false;
        expect(mu.isNUITValid("12345678")).to.be.false;
        expect(mu.isNUITValid("3100234390")).to.be.false;
        expect(mu.isNUITValid("310 023 3432")).to.be.false;
        expect(mu.isNUITValid("310-3023-432")).to.be.false;
    })

});