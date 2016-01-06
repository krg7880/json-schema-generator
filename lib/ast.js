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
  if (tree.types) {
    tree.types.push(utils.getType(node));
  } else {
    tree.types = [utils.getType(node)];
  }

  // if (tree.type === 'string') {
  //   tree.minLength = (node.length > 0) ? 1 : 0;
  // }
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
  tree.types = tree.types || [utils.getType(node)];
  tree.children = tree.children || {};
  for (var i in node) {
    if (utils.isObject(node[i])) {
      tree.children[i] = {};
      this.buildObjectTree(tree.children[i], node[i]);
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
Inspect array elements apply the correct
type and mark as required if the element has
set properties.

@method buildObject
@param {Object} tree Schema which represents the node
@param {Node} node The JSON node being inspected
*/
AST.prototype.buildArrayTree = function(tree, node) {
  tree.types = ['array'];
  tree.children = {};

  var first = node[0];
  if (utils.isObject(first)) {
    this.buildObjectTree(tree, first);
  } else if (utils.isArray(first)) {
    this.buildArrayTree(tree, first);
  } else {
    tree.children = utils.getType(first);
  }
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
