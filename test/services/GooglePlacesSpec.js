require('dotenv').config();
const proxyquire =  require('proxyquire').noCallThru();
const chai = require('chai');
const expect = chai.expect;

//const googlePlacesService = require('../../src/services/GooglePlaces');

const results = {
    data: {
        results: [{
            place_id: 1,
            name: 'test',
            rating: 1,
            vicinity: 'test street',
            geometry: {
                location: {
                    lat: 1,
                    lng: 1
                }
            }
        }]
    }
};

const googlePlacesService = proxyquire('../../src/services/GooglePlaces', {
    '@googlemaps/google-maps-services-js': {
        'Client': class {
            constructor(a) {
                return {
                    'placesNearby': (a) => {
                        return results;
                    }
                }
            }
        }
    }
});

describe('Google Places Service', () => {
    describe('Get Formatted Place', () => {
        it('should return true', async () => {
            const result = await googlePlacesService.getFormattedPlace('1,1');
            expect(result.success).to.equal(true);
        });

        it('should return true with no results', async () => {

            const results = {
                data: {
                    results: []
                }
            };

            const googlePlacesService = proxyquire('../../src/services/GooglePlaces', {
                '@googlemaps/google-maps-services-js': {
                    'Client': class {
                        constructor(a) {
                            return {
                                'placesNearby': (a) => {
                                    return results;
                                }
                            }
                        }
                    }
                }
            });

            const result = await googlePlacesService.getFormattedPlace('1,1');
            expect(result.success).to.equal(true);
        });

        it('should return false', async () => {

            const results = {
                data: {
                    error_message: 'test',
                    results: []
                }
            };

            const googlePlacesService = proxyquire('../../src/services/GooglePlaces', {
                '@googlemaps/google-maps-services-js': {
                    'Client': class {
                        constructor(a) {
                            return {
                                'placesNearby': (a) => {
                                    return results;
                                }
                            }
                        }
                    }
                }
            });

            const result = await googlePlacesService.getFormattedPlace('1,1');
            expect(result.success).to.equal(false);
        });
    });
});
