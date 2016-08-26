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

                expect(utils.checkConditionString('a.b=c\nOR\nd.e=f',sessionMock)).to.equal(true);
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

                expect(utils.checkConditionString('a.b=c\nOR\nd.e=f',sessionMock)).to.equal(false);
            });

            it("Validates FALSE when session flags are empty", function() {

                var sessionMock = {
                    attributes: {
                        flags: {}
                    }
                };

                expect(utils.checkConditionString('a.b=c\nOR\nd.e=f',sessionMock)).to.equal(false);
            });

            it("Validates FALSE when one required session flag does not exist", function() {

                var sessionMock = {
                    attributes: {
                        flags: {
                            'd.e': 'h'
                        }
                    }
                };

                expect(utils.checkConditionString('a.b=c\nOR\nd.e=f',sessionMock)).to.equal(false);
            });
        });

        describe("Check Get Other Scenes", function() {

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
                "alternateCard": {
                    "title": "p",
                    "text": "q",
                    "prompt": "r",
                    "image": {
                        "largeImageUrl": "s",
                        "smallImageUrl": "t"
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
                "alternateVoice": {
                    "intro": "u",
                    "prompt": "v"
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

            it("Has a correct rejected text strings", function() {

                var scene = utils.getModifiedScene(sceneMock,'reject');

                expect(scene.card.title).to.equal('f');
                expect(scene.card.text).to.equal('g');
                expect(scene.card.prompt).to.equal('h');
                expect(scene.card.image.largeImageUrl).to.equal('i');
                expect(scene.card.image.smallImageUrl).to.equal('j');

                expect(scene.voice.intro).to.equal('m');
                expect(scene.voice.prompt).to.equal('n');
            });

            it("Has a correct alternate text strings", function() {

                var scene = utils.getModifiedScene(sceneMock,'alternate');

                expect(scene.card.title).to.equal('p');
                expect(scene.card.text).to.equal('q');
                expect(scene.card.prompt).to.equal('r');
                expect(scene.card.image.largeImageUrl).to.equal('s');
                expect(scene.card.image.smallImageUrl).to.equal('t');

                expect(scene.voice.intro).to.equal('u');
                expect(scene.voice.prompt).to.equal('v');
            });

            it("Has the original prompt if it was set", function() {

                sceneMock.alternateCard.prompt = '';

                var scene = utils.getModifiedScene(sceneMock,'alternate');

                expect(scene.card.prompt).to.equal('c');
            });
        });
    });
});