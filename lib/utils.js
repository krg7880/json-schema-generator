'use strict';

exports.isObject = function(value) {
  return (null !== value && typeof value === typeof {} && !exports.isArray(value));
};

exports.isNumber = function(value) {
  return !exports.isArray( value ) && (value - parseFloat( value ) + 1) >= 0;
};

exports.isArray = function(value) {
  return (value instanceof Array);
};

exports.isString = function(value) {
  return (typeof value === typeof '');
};

exports.isNull = function(value) {
  return (null === value);
};

exports.isBoolean = function(value) {
  return (value === true || value === false);
};