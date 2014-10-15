# express-geocoding-api [![Build Status](https://secure.travis-ci.org/gmurphey/express-geocoding-api.png?branch=master)](http://travis-ci.org/gmurphey/express-geocoding-api)

This module sets up [express](http://expressjs.com/) middleware to expose geocoding endpoints for your app using [node-geocoder](https://github.com/nchaulet/node-geocoder).

## Getting Started
Install the module with: `npm install express-geocoding-api`

```javascript
var express_geocoding_api = require('express-geocoding-api'),
    app = require('express')();

// See `[node-geocoder](https://github.com/nchaulet/node-geocoder)` documentation for all configuration options
app.use(express_geocoding_api({ 
  geocoder: {
    provider: 'google'
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 Garrett Murphey  
Licensed under the MIT license.
