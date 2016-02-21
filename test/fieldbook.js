'use strict';

var expect = require('chai').expect;
var FieldbookAPI = require('../lib/fieldbook');
var FieldbookAPI_v1_0 = require('../lib/FieldbookAPI_v1_0');

describe('FieldbookAPI', function() {
  var options;
  var result;

  beforeEach(function() {
    options = {
      username: 'User1',
      password: 'Password',
      book: 'book1'
    };
  });

  it('should throw error if username is missing', function() {
    options.username = null;
    try {
      result = FieldbookAPI(options);
    } catch(error) {
      expect(error.message).to.equal('You have to provide an API Username for this to work.');
    }
  });

  it('should throw error if password is missing', function() {
    options.password = null;
    try {
      result = FieldbookAPI(options);
    } catch(error) {
      expect(error.message).to.equal('You have to provide an API Password for this to work.');
    }
  });

  it('should return an instance of FieldbookAPI_v1_0 if public is true', function() {
    options.username = null;
    options.password = null;
    options.public = true;
    result = FieldbookAPI(options);
    expect(result).to.instanceOf(FieldbookAPI_v1_0);
  });

  it('should throw error if book is missing', function() {
    options.book = null;
    try {
      result = FieldbookAPI(options);
    } catch(error) {
      expect(error.message).to.equal('You have to provide a Book ID for this to work.');
    }
  });

  it('should return an instance of FieldbookAPI_v1_0', function() {
    result = FieldbookAPI(options);
    expect(result).to.instanceOf(FieldbookAPI_v1_0);
  });

});
