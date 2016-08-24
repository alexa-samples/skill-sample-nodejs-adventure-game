var expect    = require("chai").expect;
var utils = require("../../../src/skill/handlers/utils");

//NOTE: great tutorial on setting up mocha tests: https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha

describe("Interactive Adventure Game Tool", function() {
    describe("Utils", function() {
        describe("Check Entry Condition String", function() {
            it("Validates TRUE when logic evaluates to TRUE", function() {

                var sessionMock = {
                    attributes: {
                        flags: {
                            'a.b': 'c',
                            'd.e': 'f'
                        }
                    }
                };

                expect(utils.checkEntryConditionString('a.b=c\nOR\nd.e=f',sessionMock)).to.equal(true);
            });

            it("Validates FALSE when logic evaluates to FALSE", function() {

                var sessionMock = {
                    attributes: {
                        flags: {
                            'a.b': 'g',
                            'd.e': 'h'
                        }
                    }
                };

                expect(utils.checkEntryConditionString('a.b=c\nOR\nd.e=f',sessionMock)).to.equal(false);
            });

            it("Validates FALSE when session flags are empty", function() {

                var sessionMock = {
                    attributes: {
                        flags: {}
                    }
                };

                expect(utils.checkEntryConditionString('a.b=c\nOR\nd.e=f',sessionMock)).to.equal(false);
            });

            it("Validates FALSE when one required session flag does not exist", function() {

                var sessionMock = {
                    attributes: {
                        flags: {
                            'd.e': 'h'
                        }
                    }
                };

                expect(utils.checkEntryConditionString('a.b=c\nOR\nd.e=f',sessionMock)).to.equal(false);
            });
        });

        describe("Check Get Reject Scene", function() {
            it("Has a correct rejected text strings", function() {

                var sceneMock = {
                        "card": {
                            "title": "a",
                            "text": "b",
                            "prompt": "c",
                            "image": {
                                "largeImageUrl": "d",
                                "smallImageUrl": "e"
                            }
                        },
                        "rejectCard": {
                            "title": "f",
                            "text": "g",
                            "prompt": "h",
                            "image": {
                                "largeImageUrl": "i",
                                "smallImageUrl": "j"
                            }
                        },
                        "voice": {
                            "intro": "k",
                            "prompt": "l"
                        },
                        "rejectVoice": {
                            "intro": "m",
                            "prompt": "n"
                        },
                        "options": [
                            {
                                "sceneId": 1,
                                "utterances": [
                                    "o"
                                ]
                            }
                        ]
                    };

                var rejectScene = utils.getRejectScene(sceneMock);

                expect(rejectScene.card.title).to.equal('f');
                expect(rejectScene.card.text).to.equal('g');
                expect(rejectScene.card.prompt).to.equal('h');
                expect(rejectScene.card.image.largeImageUrl).to.equal('i');
                expect(rejectScene.card.image.smallImageUrl).to.equal('j');

                expect(rejectScene.voice.intro).to.equal('m');
                expect(rejectScene.voice.prompt).to.equal('n');
            });
        });
    });
});