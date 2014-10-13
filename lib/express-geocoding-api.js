/*
 * express-geocoding-api
 * https://github.com/gmurphey/express-app-geocoder
 *
 * Copyright (c) 2014 Garrett Murphey
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function (config) {
  var geoservice,
      _defaults = require('lodash.defaults'),
      express = require('express'),
      geocoder = require('node-geocoder'),
      app = express();

  config = _defaults({
    geocoder: {
      provider: null,
      protocol: 'http',
      options: {}
    }
  }, config);

  geoservice = geocoder.getGeocoder(config.geocoder.provider, config.geocoder.protocol, config.geocoder.options);

  app.get('/geocode/location', function (req, res) {
    var address = req.query.address;

    geoservice.geocode(address, function (err, gres) {
      res.json({
        locations: gres
      });
    });
  });

  app.get('/geocode/point', function (req, res) {
    var latitude = req.query.latitude,
        longitude = req.query.longitude;

    geoservice.reverse(latitude, longitude, function (err, gres) {
      res.json({
        locations: gres
      });
    });
  });

  return app;
};
