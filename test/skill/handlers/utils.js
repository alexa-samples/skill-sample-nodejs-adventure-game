var expect    = require("chai").expect;
var utils = require("../../../src/skill/handlers/utils");

describe("Interactive Adventure Game Tool", function() {
    describe("Utils", function() {
        describe("Check Entry Condition String", function() {
            it("Validates TRUE", function() {

                var sessionMock = {
                    attributes: {
                        flags: {
                            'a.b': 'c',
                            'd.e': 'f'
                        }
                    }
                };

                var conditionString = 'a.b=c\nOR\nd.e=f';

                var result = utils.checkEntryConditionString(conditionString,sessionMock);

                expect(result).to.equal(true);
            });

            it("Validates FALSE", function() {

                var sessionMock = {
                    attributes: {
                        flags: {
                            'a.b': 'g',
                            'd.e': 'h'
                        }
                    }
                };

                var conditionString = 'a.b=c\nOR\nd.e=f';

                var result = utils.checkEntryConditionString(conditionString,sessionMock);

                expect(result).to.equal(false);
            });
        });
    });
});