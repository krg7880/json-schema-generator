'use strict';

var utils = require('./utils');

/**
Schema generator using a AST
tree.

@class Compiler
*/
var Compiler = function() {
  if (!this instanceof Compiler) {
    return new Compiler();
  }

  this.schema = {};
};

/**
Generates a JSON schema based on the provided AST tree.

@method generate
@param {Object} tree AST
@param {Object} schema The schema object
@param {Object} parent Schema node parent object
@return void
*/
Compiler.prototype.generate = function(tree, schema, parent) {
  for (var i in tree.children) {
    var child = tree.children[i];

    schema[i] = {};
    if (child.types.length > 1) {
      schema[i].type = child.types;
    } else {
      schema[i].type = child.types[0];
    }

    if (child.types.indexOf('object') !== -1) {
      var props = {};
      this.generate(child, props, schema[i]);
      schema[i].properties = props;
    } else if (child.types.indexOf('array') !== -1) {
      schema[i].items = {};

      if (child.children && utils.isObject(child.children)) {
        schema[i].items.type = 'object'
        var props = {};
        this.generate(child, props, schema[i]);
        schema[i].items.properties = props;
      } else {
        schema[i].items.type = child.children;
      }
    } else {
      if (child.minLength) {
        schema[i].minLength = child.minLength;
      }
    }
  }
};

/**
Initates compiling the given AST into a
JSON schema.

@method compile
@param {Object} tree AST object
@return void
*/
Compiler.prototype.compile = function(tree) {
  this.schema = {};

  if (tree.types.length > 1) {
    this.schema.types = tree.types;
  } else {
    this.schema.type = tree.types[0];
  }

  if (tree.types.indexOf('object') !== -1) {
    this.schema.properties = {};
    this.generate(tree, this.schema.properties, this.schema);
  } else if (tree.types.indexOf('array') !== -1) {
    this.schema.items = {};
    if (tree.children && utils.isObject(tree.children)) {
      this.schema.items.type = 'object';
      this.schema.items.properties = {};
      this.generate(tree, this.schema.items.properties, this.schema.items);
    } else {
      this.schema.items.type = tree.children;
    }
  }
};

module.exports = Compiler;
