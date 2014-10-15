/* globals describe, it */
'use strict';

var app,
    sinon = require('sinon'),
    request = require('supertest'),
    rewire = require('rewire'),
    api = rewire('../lib/express-geocoding-api.js');

require('should');

api.__set__('geocoder', {
  getGeocoder: sinon.stub().returns({
    geocode: sinon.stub().callsArgWith(1, null, 'geocode_test'),
    reverse: sinon.stub().callsArgWith(2, null, 'reverse_test')
  })
});

app = api({
  geocoder: {
    provider: 'google',
    protocol: 'http'
  }
});

describe('GET /geocode/location', function () {
  it('should respond with json', function (done) {
    request(app)
      .get('/geocode/location?address=14214')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        res.body.should.have.property('locations');
        res.body.locations.should.equal('geocode_test');
        done();
      });
  });
});

describe('GET /geocode/point', function () {
  it('should respond with json', function (done) {
    request(app)
      .get('/geocode/point?latitude=0&longitude=0')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        res.body.should.have.property('locations');
        res.body.locations.should.equal('reverse_test');
        done();
      });
  });
});
