'use strict';

var request = require('request');
var helpers = require('./helpers');

var FieldbookAPI_v1_0 = class {
  
  constructor(options) {
    this.options = options;
    return this;
  }

  execute(method, endpoint, data, callback) {
    var _endpoint = `https://api.fieldbook.com/v1/${this.options.book}`;
    (endpoint) ? _endpoint += endpoint : _endpoint;

    var options = {
      method: method,
      url: _endpoint,
      json: true,
      headers: {
        'Accept': 'application/json'
      },
      auth: {
        username: this.options.username,
        password: this.options.password
      }
    };

    if(typeof data === 'object') {
      options.body = data;
    }

    request(options, function (error, response, body) {
      helpers.handleFieldbookResponse(error, response, body, callback);
    });
  }

  getSheets(callback) {
    return this.execute('GET', '', {}, callback);
  }

  getSheet(sheet, callback) {
    return this.execute('GET', `/${sheet}`, {}, callback);
  }

  getRecord(sheet, record, callback) {
    return this.execute('GET', `/${sheet}/${record}`, {}, callback);
  }

  addRecord(sheet, data, callback) {
    return this.execute('POST', `/${sheet}`, data, callback);
  }

  updateRecord(sheet, record, data, callback) {
    return this.execute('PATCH', `/${sheet}/${record}`, data, callback);
  }

  deleteRecord(sheet, record, callback) {
    return this.execute('DELETE', `/${sheet}/${record}`, {}, callback);
  }

}

module.exports = FieldbookAPI_v1_0;
