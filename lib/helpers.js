'use strict';

var isSuccess = module.exports.isSuccess = function(code) {
  return (code >= 200 && code < 300);
}

var createFieldbookError = module.exports.createFieldbookError = function(message, code) {
	var error = new Error(message || (message = ''));

	if (code)
		error.code = code;

	return error;

}

var handleFieldbookResponse = module.exports.handleFieldbookResponse = function(error, response, body, callback) {
  var parsedResponse;
  if (error) {
    return callback(new Error('Unable to connect to the Fieldbook API endpoint because ' + error.message));
  }

  try {
    parsedResponse = JSON.parse(JSON.stringify(body));
  } catch (error) {
    return callback(new Error('Error parsing JSON answer from Feildbook API'));
  }

  if (!isSuccess(response.statusCode)) {
    return callback(createFieldbookError(parsedResponse.message, response.statusCode));
  }

  return callback(null, parsedResponse);
}
