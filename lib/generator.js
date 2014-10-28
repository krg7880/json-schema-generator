'use strict';

var fs = require('fs');
var argv = require('optimist').argv;
var utils = require('./utils');
var schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "",
  "properties": {}
};

var Generator = function() {
  this.schema = this.getBaseSchema();
};

/**
Sets the base properties on a new Draft-v4 
schema object
*/
Generator.prototype.getBaseSchema = function() {
  return {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "",
    "properties": {}
  };
};

/**
If the schema is an array and it's contents are objects,
set the properties of the object, otherwise,
set the properties of the array.

@param {Object} schema The schema object 
@param {String} parentName Name (key) of the parent schema
@param {Object} parent The parent node
@param {Object} data The current schema of the JSON data
*/
Generator.prototype.processArray = function(schema, parentName, parent, data) {
  for (var i=0; i<data.length; i++) {
    if (utils.isObject(data[i])) {
      this.inspect(schema, parentName, schema, data[i]);
    } else {
      this.setProps(schema, parentName, parentName, schema, data[i]);
    }
  }
};

/**
Set the ID property to include the parent schema 
if it current schema is a child of ancestor.

@param {Object} schema Current schema being inspected
@param {String} parentName Really the name of the parent 
  schema
@param {String} value Name (key) of the current schema
*/
Generator.prototype.setId = function(schema, parentName, value) {
  var p = '';
  if (schema) {
    p = (parentName) ? parentName + '/' : '';
    schema.id = 'http://jsonschema.net/' + p + '0/' + value;
  }
};

/**
Figures out the type of data we're dealing with and sets
the type accordingly. If the schema is an array or object
we call inspect to build out the children properties.

@param {Object} schema The schema object
@param {String} i Current property of parent node
@param {String} parentName Name (key) of the parent schema
@param {Object} parent The parent schema
@param {Object} data The current schema of the JSON data
*/
Generator.prototype.setProps = function(schema, i, parentName, parent, data) {
  if (utils.isObject(data)) {
    schema.properties = {};
    schema.type = 'object';
    this.inspect(schema.properties, i, schema, data);
  } else if (utils.isArray(data)) {
    schema.type = 'array';
    schema.items = {
      properties: {}
    };
    this.processArray(schema.items.properties, i, schema.items, data);
  } else if (utils.isString(data)) {
    schema.type = 'string';
    schema.minLength = (data !== '') ? 1 : 0;
  } else if (utils.isNumber(data)) {
    schema.type = 'number';
  } else if (utils.isNull(data)) {
    schema.type = null;
  } else if (utils.isBoolean(data)) {
    schema.type = 'boolean';
  }

  this.setId(schema, parentName, i);
};

/**
Kicks off inspecting the JSON document from the given root
schema and generates the Draft-v4 schema. 

@param {Object} schema The schema object
@param {String} parentName Name (key) of the parent schema
@param {Object} parent The parent schema
@param {Object} data The current schema of the JSON data
*/
Generator.prototype.inspect = function(schema, parentId, parent, data) {
  var keys = [];
  for (var i in data) {
    schema[i] = {};

    if (!utils.isObject(data[i]) && !utils.isArray(data[i])) {
      keys.push(i);
    }

    this.setProps(schema[i], i, parentId, schema[i], data[i])
  }

  parent.required = keys;
};

/**
Main entry point to generate a Draft-v4 schema.

@param {Object} schema The JSON object to generate
a Draft-v4 schema against.
*/
Generator.prototype.generate = function(json) {
  this.inspect(this.schema.properties, '', this.schema.properties, json);

  // set the type to of the root (array or json)
  if (utils.isObject(json)) {
    this.schema.type = 'object';
  } else if (utils.isArray(json)) {
    this.schema.type = 'array';
  }

  // delete type off the root.properties schema
  delete schema.properties.type;

  return this.schema;
};

module.exports = Generator;