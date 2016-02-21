# Node-Fieldbook [![Build Status: Linux](https://travis-ci.org/connormckelvey/node-fieldbook.svg?branch=master)](https://travis-ci.org/connormckelvey/node-fieldbook)

Node-Fieldbook is a node API wrapper for Fieldbook's REST API.

## Breaking Changes
As of version 1.0.0, Node-Fieldbook provides a Promise-based API. Callback functions used in previous versions are no longer available.

## Installation
`npm install node-fieldbook --save`

## Authenticated Usage
```javascript
'use strict';
var Fieldbook = require('node-fieldbook');

var book = new Fieldbook({
  username: 'key-1',
  password: '66-917-9bu-_vSv12kgv70gY--_vYl541-9fCl',
  book: '365eb3263534950399fc5eb6'
});
```

## [Public](https://github.com/fieldbook/api-docs/blob/master/reference.md#public-read-only-access) (Read-only) Usage
```javascript
'use strict';
var Fieldbook = require('node-fieldbook');

var book = new Fieldbook({
  book: '365eb3263534950399fc5eb6'
});
```

## Methods
More in depth details on these method refer to the [Fieldbook API](https://github.com/fieldbook/api-docs/blob/master/reference.md) documentation.

### Get Sheets
Returns a list of sheets within the book specified at instantiation.

##### Example
```javascript
...
book.getSheets()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Get Sheet
Returns an array of records from a particular sheet. Supports a query object. [Read more](https://github.com/fieldbook/api-docs/blob/master/reference.md#sheet-queries) about queries and filters.

##### Example
```javascript
...
filter = {
  name: 'Connor',
  limit: 1
};

book.getSheet('contacts', filter)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Get Record
Returns a single record (by ID) from a sheet. Supports a query object. [Read more](https://github.com/fieldbook/api-docs/blob/master/reference.md#sheet-queries) about queries and filters.

##### Example
```javascript
...
filter = {
  name: 'Connor',
  limit: 1
};

book.getRecord('contacts', 2, filter)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Add Record
Add a Record to a Sheet

##### Example
```javascript
...
var data = { name: 'Connor McKelvey', email: 'connormckelvey@gmail.com' };

book.addRecord('contacts', data)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Update Record
Update a record.

##### Example
```javascript
...
var data = { email: 'connormckelvey+github@gmail.com' };

book.updateRecord('contacts', 5, data)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Delete Record
Deletes a record by ID.

##### Example
```javascript
...
book.deleteRecord('contacts', 5)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Add Webhook
Registers a [webhook](https://github.com/fieldbook/api-docs/blob/master/reference.md#webhooks) to a book.

##### Example
```javascript
...
book.addWebhook({
  url: 'https://example.com/callback', //Basic Auth: https://user:pass@example.com/callback
  actions: ['create', 'update', 'destroy']
})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Get Webhooks
Returns an array of current webhooks for a book.

##### Example
```javascript
...
book.getWebhooks()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Delete Webhook
De-registers a webhook from a book.

##### Example
```javascript
...
book.deleteWebhook('26ca2a4f233547030eed28c10')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```
