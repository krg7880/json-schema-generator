'use strict';

/**
Generates an Abstract Syntax Tree
used for generating the schema.

@see: https://en.wikipedia.org/wiki/Abstract_syntax_tree
*/
var utils = require('./utils');

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
Inspect primitatives and apply the correct type
and mark as required if the element contains a value.

@method buildPrimitive
@param {Object} tree Schema which represents the node
@param {Node} node The JSON node being inspected
@return void
*/
AST.prototype.buildPrimitive = function(tree, node) {
  var types = tree.types,
      type = utils.getType(node);

  if (types && types.length) {
    if (types.indexOf(type) === -1) {
      types.push(type);
      types.sort();
    }
  } else {
    tree.types = [type];
  }
};

/**
Inspect object properties and apply the correct
type and mark as required if the element has set
properties.

@method buildObject
@param {Object} tree Schema which represents the node
@param {Node} node The JSON node being inspected
*/
AST.prototype.buildObjectTree = function(tree, node) {
  tree.types = tree.types || [utils.getType(node)];
  tree.children = tree.children || {};

  if (utils.getType(node) === 'object') {
    for (var i in node) {
      tree.children[i] = tree.children[i] || {};

      if (utils.isObject(node[i])) {
        this.buildObjectTree(tree.children[i], node[i]);
      } else if (utils.isArray(node[i])) {
        this.buildArrayTree(tree.children[i], node[i]);
      } else {
        this.buildPrimitive(tree.children[i], node[i]);
      }
    }
  }
};

/**
Inspect array elements apply the correct
type and mark as required if the element has
set properties.

@method buildObject
@param {Object} tree Schema which represents the node
@param {Node} node The JSON node being inspected
*/
AST.prototype.buildArrayTree = function(tree, node) {
  var reducedArray = [],
      elemsCount = node.length;

  // Pick only first, middle and last element from arrays containing > 3
  // elements for performance optimization
  if (elemsCount > 3) {
    reducedArray = [
      node[0],
      node[Math.floor(elemsCount / 2)],
      node[elemsCount - 1]
    ];
  } else {
    reducedArray = node;
  }

  tree.types = ['array'];
  tree.children = tree.children || {};

  reducedArray.forEach(function(elem) {
    if (utils.isObject(elem)) {
      this.buildObjectTree(tree, elem);
    } else if (utils.isArray(elem)) {
      this.buildArrayTree(tree, elem);
    } else {
      tree.children = utils.getType(elem);
    }
  }.bind(this));
};

/**
Initiates generating the AST from the
given JSON document.

@param {Object} json JSON object
@return void
*/
AST.prototype.build = function(json) {
  if (json instanceof Array) {
    this.buildArrayTree(this.tree, json);
  } else {
    this.buildObjectTree(this.tree, json);
  }
};

module.exports = AST;
