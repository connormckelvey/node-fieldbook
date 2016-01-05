'use strict';

var request = require('request');
var helpers = require('./helpers');

var FieldbookAPI_v1_0 = class {

  constructor(options) {
    this.options = options;
    return this;
  }

  execute(method, endpoint, data) {
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

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {          
          try {
            var result = helpers.handleFieldbookResponse(error, response, body);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      });
  }

  getSheets() {
    return this.execute('GET', '', {});
  }

  getSheet(sheet) {
    return this.execute('GET', `/${sheet}`, {});
  }

  getRecord(sheet, record) {
    return this.execute('GET', `/${sheet}/${record}`, {});
  }

  addRecord(sheet, data) {
    return this.execute('POST', `/${sheet}`, data);
  }

  updateRecord(sheet, record, data) {
    return this.execute('PATCH', `/${sheet}/${record}`, data);
  }

  deleteRecord(sheet, record) {
    return this.execute('DELETE', `/${sheet}/${record}`, {});
  }

}

module.exports = FieldbookAPI_v1_0;
