# Node-Fieldbook [![Build Status: Linux](https://travis-ci.org/connormckelvey/node-fieldbook.svg?branch=master)](https://travis-ci.org/connormckelvey/node-fieldbook)

Node-Fieldbook is a node API wrapper for Fieldbook's REST API.

## Installation
`npm install node-fieldbook --save`

## Usage
```javascript
'use strict';
var Fieldbook = require('node-fieldbook');

var book = new Fieldbook({
  username: 'key-1',
  password: '66-917-9bu-_vSv12kgv70gY--_vYl541-9fCl',
  book: '365eb3263534950399fc5eb6'
});
```

## Methods
More indepth details on these method refer to the [Fieldbook API](https://github.com/fieldbook/api-docs/blob/master/reference.md) documentation.

### Get Sheets
Returns a list of sheets within the book specified at instantiation.

##### Example
```javascript
...
book.getSheets(function(error, body) {
  var sheetsArray = body;
});
```

### Get Sheet
Returns an array of records from a particular sheet.

##### Example
```javascript
...
book.getSheet('contacts', function(error, body) {
  var contacts = body;
});
```

### Get Record
Returns a single record (by ID) from a sheet.

##### Example
```javascript
...
book.getRecord('contacts', 2, function(error, body) {
  var contactWithIDof2 = body;
});
```

### Add Record
Add a Record to a Sheet

##### Example
```javascript
...
var data = { name: 'Connor McKelvey', email: 'connormckelvey@gmail.com' };

book.addRecord('contacts', data, function(error, body) {
  var newContact = body;
});
```

### Update Record
Update a record.

##### Example
```javascript
...
var data = { email: 'connormckelvey+github@gmail.com' };

book.updateRecord('contacts', 5, data, function(error, body) {
  var contactWithIDof5 = body;
});
```

### Delete Record
Deletes a record by ID.

##### Example
```javascript
...
book.deleteRecord('contacts', 5, function(error, body) {
  var result = body; //Undefined
});
```

## TODO
- Write mocks and tests for request methods.
