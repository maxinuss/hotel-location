require('dotenv').config();
const proxyquire =  require('proxyquire').noCallThru();
const chai = require('chai');
const expect = chai.expect;

const booking = {
    rows: [{
        id: 1,
        property_id: 1,
        user_id: 1,
        creation_datetime: "2020-02-27T22:51:48.500Z"
    }]
};

const bookingModel = proxyquire('../../src/models/Booking', {
    '../db': {
        'db': {
            'query': (a, b) => {
                return booking;
            },
        }
    }
});

describe('Boooking Model', () => {
    describe('Add booking', () => {
        it('should return true', async () => {
            const result = await bookingModel.addBooking(1, 1);
            expect(result.success).to.equal(true);
        });

        it('should return false', async () => {
            const bookingModel = proxyquire('../../src/models/Booking', {
                '../db': {
                    'db': {
                        'fakeMethodName': () => {
                            return booking;
                        },
                    }
                }
            });

            const result = await bookingModel.addBooking(1, 1);
            expect(result.success).to.equal(false);
        });
    });

    describe('Get booking', () => {
        it('should return true', async () => {
            const result = await bookingModel.getBooking(1);
            expect(result.success).to.equal(true);
        });
        it('should return false', async () => {
            const bookingModel = proxyquire('../../src/models/Booking', {
                '../db': {
                    'db': {
                        'fakeMethodName': () => {
                            return booking;
                        },
                    }
                }
            });

            const result = await bookingModel.getBooking(1);
            expect(result.success).to.equal(false);
        });
    });
});
