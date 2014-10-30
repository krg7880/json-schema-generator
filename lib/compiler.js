'use strict';

var fs = require('fs');
var argv = require('optimist').argv;
var utils = require('./utils');
var crypto = require('crypto');

var schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "",
  "properties": {}
};

var Compiler = function() {
  this.schema = this.getBaseSchema();
};

Compiler.prototype.disableAdditionalProperties = function() {
  this.disableAdditionalProperties = true;
};

/**
Sets the base properties on a new Draft-v4 
schema object
*/
Compiler.prototype.getBaseSchema = function() {
  return {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "",
  };
};

Compiler.prototype.generate = function(tree, schema, parent) {
	for (var i in tree.children) {
		var child = tree.children[i];
		if (child.type === 'object') {
			parent.required.push(i);
			schema[i] = {
				type: 'object'
				,properties: {}
				,required: []
			};
			this.generate(child, schema[i].properties, schema[i]);
		} else if (child.type === 'array') {
			parent.required.push(i);
			schema[i] = {
				type: 'array'
				,uniqueItems: child.uniqueItems
				,minItems: child.minItems
				,items: {
					required:[]
					,properties: {}
				}
			}
			this.generate(child, schema[i].items.properties, schema[i]);
		} else {
			schema[i] = {};
			if (child.type) {
				schema[i].type = child.type;
			}

			if (child.minLength) { 
				schema[i].minLength = child.minLength;
			}

			if (child.required) {
				if (parent.items && parent.items.required) {
					parent.items.required.push(i);
				} else {
					parent.required.push(i);
				}
			}
		}
	}
};

Compiler.prototype.compile = function(tree) {
	if (tree.type === 'object') {
	 this.schema = {
	 	'$schema': 'http://json-schema.org/draft-04/schema#'
	 	,description: ''
	 	,type: 'object'
	 	,properties: {}
	 	,required: []
	 };
	 this.generate(tree, this.schema.properties, this.schema);
	} else {
		this.schema = {
			type: 'array'
			,'$schema': 'http://json-schema.org/draft-04/schema#'
			,'description': ''
			,minItems: 1
			,uniqueItems: true
			,items: {
				type: 'object'
				,required: []
				,properties: {}
			}
		};

		this.generate(tree, this.schema.items.properties, this.schema.items);
	}
};

module.exports = Compiler;