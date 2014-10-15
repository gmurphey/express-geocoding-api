/*
 * express-geocoding-api
 * https://github.com/gmurphey/express-geocoding-api
 *
 * Copyright (c) 2014 Garrett Murphey
 * Licensed under the MIT license.
 */

'use strict';

var geoservice,
    _deepDefaults = require('merge-defaults'),
    express = require('express'),
    geocoder = require('node-geocoder'),
    app = express();

module.exports = function (config) {
  config = _deepDefaults(config, {
    geocoder: {
      provider: null,
      protocol: 'http',
      options: {}
    },
    response: function (res, locations) {
      res.json({
        locations: locations
      });
    }
  });

  geoservice = geocoder.getGeocoder(config.geocoder.provider, config.geocoder.protocol, config.geocoder.options);

  app.get('/geocode/location', function (req, res) {
    var address = req.query.address;

    geoservice.geocode(address, function (err, gres) {
      config.response(res, gres);
    });
  });

  app.get('/geocode/point', function (req, res) {
    var latitude = req.query.latitude,
        longitude = req.query.longitude;

    geoservice.reverse(latitude, longitude, function (err, gres) {
      config.response(res, gres);
    });
  });

  return app;
};
