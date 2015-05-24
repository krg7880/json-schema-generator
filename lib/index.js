'use strict';

var Compiler = require('./compiler');
var AST = require('./ast.js');
var utils = require('./utils');

var jsonToSchema = function(json) {
  var compiler = new Compiler();
  var ast = new AST();
  ast.build(json);
  compiler.compile(ast.tree);
  return compiler.schema;
};

module.exports = jsonToSchema;
