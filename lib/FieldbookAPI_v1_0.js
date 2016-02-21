'use strict';

var request = require('request');
var querystring = require('querystring');
var helpers = require('./helpers');
const WEBHOOKS_ENDPOINT = '/meta/webhooks';

var FieldbookAPI_v1_0 = class {

  constructor(options) {
    this.options = options;
    return this;
  }

  execute(method, endpoint, data, query) {
    var _endpoint, options;

    if(method !== 'GET' && this.options.public) {
      throw new Error('The Fieldbook API is readonly without an API-key');
    }

    query = query || {};
    _endpoint = `https://api.fieldbook.com/v1/${this.options.book}`;
    endpoint ? _endpoint += endpoint : _endpoint;
    Object.keys(query).length ? _endpoint += '?' + querystring.stringify(query) : _endpoint;

    options = {
      method: method,
      url: _endpoint,
      json: true,
      headers: {
        'Accept': 'application/json'
      }
    };

    if(!this.options.public) {
      options.auth = {
        username: this.options.username,
        password: this.options.password
      }
    }

    if(typeof data === 'object') {
      options.body = data;
    }

    return new Promise((resolve, reject) => {
      console.log(options)
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

  getSheet(sheet, query) {
    return this.execute('GET', `/${sheet}`, {}, query);
  }

  getRecord(sheet, record, query) {
    return this.execute('GET', `/${sheet}/${record}`, {}, query);
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

  addWebhook(config) {
    return this.execute('POST', WEBHOOKS_ENDPOINT, config);
  }

  getWebhooks() {
    return this.execute('GET', WEBHOOKS_ENDPOINT, {});
  }

  deleteWebhook(webhook) {
    return this.execute('DELETE', `${WEBHOOKS_ENDPOINT}/${webhook}`);
  }

}

module.exports = FieldbookAPI_v1_0;
