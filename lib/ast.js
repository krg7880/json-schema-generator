'use strict';

/**
Generates an Abstract Syntax Tree
used for generating the schema.

@see: https://en.wikipedia.org/wiki/Abstract_syntax_tree
*/
var utils = require('./utils');
var crypto = require('crypto');

/**
Abstract Syntax Tree Class

@class AST
@return {Object}
*/
var AST = function() {
  if (!this instanceof AST) {
    return new AST();
  }

  this.tree = {};
};

/**
Computes the hex hash of the given value

@method generateHash
@param {Mixed} value Value to hash
@return {String} HEX value.
*/
AST.prototype.generateHash = function(value) {
 if (utils.isObject(value)) {
    var keys = Object.keys(value);
    return crypto.createHash("md5").update(JSON.stringify(keys)).digest("hex");
  } else if (utils.isArray(value)) {
    return crypto.createHash("md5").update(JSON.stringify(value)).digest("hex");
  } else {
    return crypto.createHash("md5").update(value).digest("hex");
  }
};

/**
Checks if the elements in the given node are all
equal. 

@method isAllSimilarObject
@param {Object} node JSON node to inspect
@return {Object}
*/
AST.prototype.isAllSimilarObjects = function(node) {
  var hashes = [];
  var max = 0;
  var selected = null;
  for (var i in node) {
    var hash = this.generateHash(node[i]);
    hashes[hash] = true;
    var keys = Object.keys(node[i]);
    if (!max || keys.length > max) {
      max = keys.length;
      selected = node[i];
    }
  }

  return {same: (hashes.length === 1), selected: selected};
}

/**
Inspect primitatives and apply the correct type
and mark as required if the element contains a value.

@method buildPrimitive
@param {Object} tree Schema which represents the node
@param {Node} node The JSON node being inspected
@return void
*/
AST.prototype.buildPrimitive = function(tree, node) {
  tree.type = utils.getType(node);
  if (tree.type === 'string') {
    tree.minLength = (node.length > 0) ? 1 : 0;
  } 

  if (node !== null && typeof node !== 'undefined') {
    tree.required = true;
  }
}

/**
Inspect object properties and apply the correct
type and mark as required if the element has set 
properties.

@method buildObject
@param {Object} tree Schema which represents the node
@param {Node} node The JSON node being inspected
*/
AST.prototype.buildObjectTree = function(tree, node) {
  console.log('Build object tree')
  tree.type = tree.type || 'object';
  tree.children = tree.children || {};
  for (var i in node) {
    if (utils.isObject(node[i])) {
      tree.children[i] = {};
      this.buildObjectTree(tree.children[i], node[i]);
      continue;
    } else if (utils.isArray(node[i])) {
      tree.children[i] = {};
      this.buildArrayTree(tree.children[i], node[i]);
    } else {
      tree.children[i] = {};
      this.buildPrimitive(tree.children[i], node[i]);
    } 
  }
};

/**
Checks each element of the given array to
see if their all strings or numbers.

@method buildObject
@param {Object} tree Schema which represents the node
@param {Node} node The JSON node being inspected
 */
AST.prototype.isArrayPrimitive = function isArrayPrimitive(tree, node) {
  var prim = {};
  var type = '';

  for (var i=0; i<node.length; i++) {
    type = typeof node[i];

    if (type === 'string' || type === 'number') {
      prim[type] = true;
    }
  }

  if (Object.keys(prim).length === 1) {
    tree.type = 'arrayPrimitive';
    tree.uniqueItems = false;
    tree.primType = type;
    return true;
  } 

  return false;
}

/**
Inspect array elements apply the correct
type and mark as required if the element has 
set properties.

@method buildObject
@param {Object} tree Schema which represents the node
@param {Node} node The JSON node being inspected
*/
AST.prototype.buildArrayTree = function(tree, node) {
  console.log('Tree', tree);
  tree.type = 'array';
  tree.children = {};
  var first = node[0];
  if (utils.isObject(first)) {
    var similar = this.isAllSimilarObjects(node);
    if (this.isAllSimilarObjects(node)) {
      tree.uniqueItems = true;
      tree.minItems = 1;
      console.log('All unique')
      return this.buildObjectTree(tree, similar.selected);
    }
  };

  // check if all elements is a primitave
  if (this.isArrayPrimitive(tree, node)) {
    return;
  }

  for (var i=0; i<node.length; i++) {
    if (utils.isObject(node[i])) {
      tree.children[i] = {};
      tree.children[i].type = 'object';
      var keys = Object.keys(node[i]);
      if (keys.length > 0) {
        tree.children[i].required = true;
      }
      this.buildObjectTree(tree.children[i], node[i]);
    } else if (utils.isArray(node[i])) {
        tree.children[i] = {};
        tree.children[i].type = 'array';
        tree.children[i].uniqueItems = true;
        if (node[i].length > 0) {
          tree.children[i].required = true;
        }

      this.buildArrayTree(tree.children[i], node[i]);
    } else {
      if (tree.type === 'object') {
        tree.children[i] = {};
        this.buildPrimitive(tree.children[i], node[i]);
      }
    }
  }
};

/**
Initiates generating the AST from the 
given JSON document.

@param {Object} json JSON object
@return void
*/
AST.prototype.build = function(json) {
  console.log('Build');
  if (json instanceof Array) {
    this.buildArrayTree(this.tree, json);
  } else {
    this.buildObjectTree(this.tree, json);
  }
};

module.exports = AST;
