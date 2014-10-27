'use strict';

exports.isObject = function(value) {
  return (null !== value && typeof value === typeof {} && !exports.isArray(value));
};

exports.isNumber = function(value) {
  return !isNaN(value);
};

exports.isArray = function(value) {
  return (value instanceof Array);
};

exports.isString = function(value) {
  return (typeof value === typeof '');
};