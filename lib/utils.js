'use strict';

exports.isObject = function(value) {
  return !exports.isArray(value) && value !== null && typeof value === typeof {};
};

exports.isInteger = function(value) {
  return !exports.isArray(value) && !exports.isObject(value) && Number(value) === value && value % 1 === 0;
};

exports.isNumber = function(value) {
  return !exports.isArray(value) && !exports.isObject(value) && Number(value) === value;
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

exports.toObject = function(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
};

exports.oneIsNull = function(v1, v2) {
  return ((v1 === null && v2 !== null) || (v1 !== null && v2 === null));
};

exports.isUndefined = function(val) {
  return (null === val || typeof val === 'undefined');
};

exports.isFunction = function(fn) {
  return (typeof fn === 'function');
};

exports.isEqual = function(v1, v2) {
  if (typeof v1 !== typeof v2 || exports.oneIsNull(v1, v2)) {
    return false;
  }

  if (typeof v1 === typeof "" || typeof v1 === typeof 0) {
    return v1 === v2;
  }

  var _isEqual = true;

  if (typeof v1 === typeof {}) {
    var compare = function(value1, value2) {
      for (var i in value1) {
        if (!value2.hasOwnProperty(i)) {
          _isEqual = false;
          break;
        }

        if (exports.isObject(value1[i])) {
          compare(value1[i], value2[i]);
        } else if (typeof value1[i] === typeof "") {
          if (value1[i] !== value2[i]) {
            _isEqual = false;
            break;
          }
        }
      }
    }

    compare(v1, v2);
  }

  return _isEqual;
};

exports.getType = function(data) {
  if (exports.isNull(data)) {
    return 'null';
  } else if (exports.isBoolean(data)) {
    return 'boolean';
  } else if (exports.isString(data)) {
    return 'string';
  } else if (exports.isInteger(data)) {
    return 'integer';
  } else if (exports.isNumber(data)) {
    return 'number';
  } else if (exports.isObject(data)) {
    return 'object';
  } else if (exports.isArray(data)) {
    return 'array';
  }
};
