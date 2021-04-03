'use strict';

const expect = require('expect.js');

const CombUUID = require('..');

describe('CombUUID', function() {

    describe('.encode(now = new Date())', function () {

        it('should return a string', function () {
            expect(CombUUID.encode()).to.be.a('string');
        });

        it('should return 36 characters', function () {
            expect(CombUUID.encode()).to.have.length(36);
        });

        it('should return a version 4 UUID', function () {
            expect(CombUUID.encode()).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        });

        it('should return a variant b UUID', function () {
            expect(CombUUID.encode()).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-b[0-9a-f]{3}-[0-9a-f]{12}$/);
        });

        it('should convert the date to a timestamp', function () {
            expect(CombUUID.encode(1578422706217)).to.match(/8f8e8478/);
        });

    });

    describe('.decode(uuid)', function () {
        const sample = '8F8E8478-9035-4D23-B9A7-62F4D2612CE5';

        it('should throw an error on non-string inputs', function () {
            [
                undefined,
                null,
                Buffer.alloc(1),
                /foobar/,
                [],
                {},
                false,
                NaN,
                Infinity,
                42,
            ].forEach((testcase) => {
                expect(() => CombUUID.decode(testcase)).to.throwError();
            });

        });

        it('should throw an error on non-UUID string inputs', function () {
            [
                'foo',
                new Date().toJSON(),
            ].forEach((testcase) => {
                expect(() => CombUUID.decode(testcase)).to.throwError();
            });

        });

        it('should return an object', function () {
            expect(CombUUID.decode(sample)).to.be.a('object');
        });

        describe('.version', function () {

            it('should be defined', function () {
                expect(CombUUID.decode(sample)).to.have.property('version');
            });

            it('should be a string', function () {
                expect(CombUUID.decode(sample).version).to.be.a('string');
            });

            it('should have length 1', function () {
                expect(CombUUID.decode(sample).version).to.have.length(1);
            });

            it('should have value 4 for v4 uuid', function () {
                expect(CombUUID.decode(sample).version).to.be('4');
            });

        });

        describe('.variant', function () {

            it('should be defined', function () {
                expect(CombUUID.decode(sample)).to.have.property('variant');
            });

            it('should be a string', function () {
                expect(CombUUID.decode(sample).variant).to.be.a('string');
            });

            it('should have length 1', function () {
                expect(CombUUID.decode(sample).variant).to.have.length(1);
            });

            it('should have value b for variant b uuid', function () {
                expect(CombUUID.decode(sample).variant).to.be('b');
            });

        });

        describe('.timestamp', function () {

            it('should be defined', function () {
                expect(CombUUID.decode(sample)).to.have.property('timestamp');
            });

            it('should be a number', function () {
                expect(CombUUID.decode(sample).timestamp).to.be.a('number');
            });

            it('should represent the time', function () {
                expect(CombUUID.decode(sample).timestamp).to.be(157842270621749);
            });

            it('should represent the time', function () {
                expect(CombUUID.decode(sample).timestamp).to.be(157842270621749);
            });

        });

    });
});
