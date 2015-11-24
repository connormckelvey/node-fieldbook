'use strict';

var request = require('request');
var FieldbookAPI_v1_0 = require('./FieldbookAPI_v1_0');

var FeildbookAPI = function(options) {

    if (!options.username) {
      throw new Error('You have to provide an API Username for this to work.');
    }

    if (!options.password) {
      throw new Error('You have to provide an API Password for this to work.');
    }

    if (!options.book) {
      throw new Error('You have to provide a Book ID for this to work.');
    }

    if (!options.version || options.version == '1.0' || options.version == '1') {
      return new FieldbookAPI_v1_0(options);
    }
  	else {
      throw new Error('Version ' + options.version + ' of the Fieldbook API is currently not supported.');
    }
}

module.exports = FeildbookAPI;
