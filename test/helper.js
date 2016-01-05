'use strict';

var expect = require('chai').expect;
var helpers = require('../lib/helpers');

describe('Helpers', function() {
  describe('#isSuccess', function() {
    it('should return true if status code falls in 200..299', function() {
      var resultLow = helpers.isSuccess(200);
      var resultHigh = helpers.isSuccess(299);

      expect(resultLow).to.be.true;
      expect(resultHigh).to.be.true;
    });

    it('should return false if status code falls out of 200..299', function() {
      var resultLow = helpers.isSuccess(199);
      var resultHigh = helpers.isSuccess(301);

      expect(resultLow).to.be.false;
      expect(resultHigh).to.be.false;
    });
  });

  describe('#createFieldbookError', function() {
    it('should return an error object with message', function() {
      var result = helpers.createFieldbookError('Sample Error Message');
      expect(result.message).to.be.equal('Sample Error Message');
    });

    it('should return an error object with message and error code', function() {
      var result = helpers.createFieldbookError('Sample Error Message', 400);
      expect(result.message).to.be.equal('Sample Error Message');
      expect(result.code).to.be.equal(400);
    });
  });

  describe('#handleFieldbookResponse', function() {
    var error, response, body, result;

    beforeEach(function() {
      error = new Error('Sample Error Message');
      response = { statusCode: 200 };
      body = { id: 1, name: 'Name' };
    });

    it('should throw "cannot connect error" if error argument truthy', function(){
      try {
        var result = helpers.handleFieldbookResponse(error, response, body);
      } catch (err) {
        expect(err.message).to.equal('Unable to connect to the Fieldbook API endpoint because ' + error.message);
      }
    });

    it('should throw "cannot parse json error" if body is not valid', function(){
      error = null;
      body = undefined;

      try {
        var result = helpers.handleFieldbookResponse(error, response, body);
      } catch (err) {
        expect(err.message).to.equal('Error parsing JSON answer from Feildbook API');
      }
    });

    it('should throw "status code error" if statusCode does not fall in 200..299', function() {
      error = null;
      response.statusCode = 400;
      body = { message: 'Sample server error' };

      try {
        var result = helpers.handleFieldbookResponse(error, response, body);
      } catch (err) {
        expect(err.message).to.equal('Sample server error');
        expect(err.code).to.equal(400);        
      }
    });
  });
});
