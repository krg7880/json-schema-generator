'use strict';

/**
Generates an Abstract Syntax Tree
used for generating the schema.

@see: https://en.wikipedia.org/wiki/Abstract_syntax_tree
*/
var utils = require('./utils');
var crypto = require('crypto');

var AST = function() {
  this.tree = {};
};

/**
Computes the hex hash of the given value

@param {Mixed} value Value to hash
@return {String} HEX value.
*/
AST.prototype.generateHash = function(value) {
 if (utils.isObject(value)) {
    var keys = Object.keys(value);
    return crypto.createHash("md5").update(JSON.stringify(keys)).digest("hex");
  } else if (utils.Array(value)) {
    return crypto.createHash("md5").update(JSON.stringify(value)).digest("hex");
  } else {
    return crypto.createHash("md5").update(value).digest("hex");
  }
}

AST.prototype.buildPrimative = function(tree, node) {
  tree.type = utils.getType(node);
  if (tree.type === 'string') {
    tree.minLength = (node.length > 0) ? 1 : 0;
  } 

  if (node !== null && typeof node !== 'undefined') {
    tree.required = true;
  }
}

AST.prototype.buildObjectTree = function(tree, node) {
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
      this.buildPrimative(tree.children[i], node[i]);
    } 
  }
};

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

AST.prototype.buildArrayTree = function(tree, node) {
  tree.type = 'array';
  tree.children = {};
  var first = node[0];
  if (utils.isObject(first)) {
    var similar = this.isAllSimilarObjects(node);
    if (this.isAllSimilarObjects(node)) {
      tree.uniqueItems = true;
      tree.minItems = 1;

      return this.buildObjectTree(tree, similar.selected);
    }
  };

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
      tree.buildArrayTree(tree.children[i], node[i]);
    } else {
      tree.children[i] = {};
      this.buildPrimative(tree.children[i], node[i]);
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
  if (json instanceof Array) {
    this.buildArrayTree(this.tree, json);
  } else {
    this.buildObjectTree(this.tree, json);
  }
};

module.exports = AST;