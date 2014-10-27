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
If the node is an array and it's contents are objects,
set the properties of the object, otherwise,
set the properties of the array.
*/
Generator.prototype.processArray = function(node, parentName, parent, data) {
  for (var i=0; i<data.length; i++) {
    if (utils.isObject(data[i])) {
      this.inspect(node, parentName, node, data[i]);
    } else {
      this.setProps(node, parentName, parentName, node, data[i]);
    }
  }
};

/**
Set the ID property to include the parent node 
if it current node is a child of ancestor.

@param {Object} node Current node being inspected
@param {String} parentName Really the name of the parent 
  node
@param {String} value Name (key) of the current node
*/
Generator.prototype.setId = function(node, parentName, value) {
  var p = '';
  if (node) {
    p = (parentName) ? parentName + '/' : '';
    node.id = 'http://jsonschema.net/' + p + '0/' + value;
  }
};

/**
Figures out the type of data we're dealing with and sets
the type accordingly. If the node is an array or object
we call inspect to build out the children properties.

@param {Object} node Current node being inspected
@param {String} i Current property of parent node
@param {String} parentName Name (key) of the parent node
@param {Object} parent The parent node
*/
Generator.prototype.setProps = function(node, i, parentName, parent, data) {
  if (utils.isObject(data)) {
    node.properties = {};
    node.type = 'object';
    this.inspect(node.properties, i, node, data);
  } else if (utils.isArray(data)) {
    node.type = 'array';
    node.items = {
      properties: {}
    };
    this.processArray(node.items.properties, i, node.items, data);
  } else if (utils.isString(data)) {
    node.type = 'string';
    node.minLength = (data !== '') ? 1 : 0;
  } else if (utils.isNumber(data)) {
    node.type = 'number';
  } 

  this.setId(node, parentName, i);
};

Generator.prototype.inspect = function(node, parentId, parent, data) {
  var keys = [];
  for (var i in data) {
    node[i] = {};

    if (!utils.isObject(data[i]) && !utils.isArray(data[i])) {
      keys.push(i);
    }

    this.setProps(node[i], i, parentId, node[i], data[i])
  }

  parent.required = keys;
};

/**
Main entry point to generate a Draft-v4 schema.

@param {Object} node The JSON object to generate
a Draft-v4 schema against.
*/
Generator.prototype.generate = function(json) {
  this.inspect(this.schema.properties, '', this.schema.properties, json);

  // set the type to of the root (array or json)
  if (utils.isObject(json)) {
    this.schema.type = 'object';
  } else if (isArray(json)) {
    this.schema.type = 'array';
  }

  // delete type off the root.properties node
  delete schema.properties.type;

  return this.schema;
};

module.exports = Generator;