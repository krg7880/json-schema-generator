var path = require('path');
var utils = require(path.resolve(process.env.PWD + '/lib/utils'));
var chai = require('chai');
chai.use(require('chai-json-schema'));
var expect = chai.expect;

var arrInt = [1, 2, 3, 4];
var arrStr = ["one", "two", "three", "four"];
var str = "Hello, world!";
var obj = {
  name: 'foo'
  ,value: 'bar'
  ,enum: arrInt
};
var boolTrue = true;
var boolFalse = false;
var nil = null;
var num = 100000101;

describe('Utils', function() {
  it('should validate only array data types', function() {
    expect(utils.isArray(arrInt)).to.equal(true);
    expect(utils.isArray(arrStr)).to.equal(true);
    expect(utils.isArray(str)).to.equal(false);
    expect(utils.isArray(obj)).to.equal(false);
    expect(utils.isArray(boolTrue)).to.equal(false);
    expect(utils.isArray(boolFalse)).to.equal(false);
    expect(utils.isArray(nil)).to.equal(false);
    expect(utils.isArray(num)).to.equal(false);
  });

  it('should validate only boolean values', function() {
    expect(utils.isBoolean(boolTrue)).to.equal(true);
    expect(utils.isBoolean(boolFalse)).to.equal(true);
    expect(utils.isBoolean(arrInt)).to.equal(false);
    expect(utils.isBoolean(arrStr)).to.equal(false);
    expect(utils.isBoolean(str)).to.equal(false);
    expect(utils.isBoolean(obj)).to.equal(false);
    expect(utils.isBoolean(nil)).to.equal(false);
    expect(utils.isBoolean(num)).to.equal(false);
  });

  it('should validate only numerical values', function() {
    expect(utils.isNumber(num)).to.equal(true);
    expect(utils.isNumber(boolTrue)).to.equal(false);
    expect(utils.isNumber(boolFalse)).to.equal(false);
    expect(utils.isNumber(str)).to.equal(false);
    expect(utils.isNumber(arrInt)).to.equal(false);
    expect(utils.isNumber(arrStr)).to.equal(false);
    expect(utils.isNumber(obj)).to.equal(false);
    expect(utils.isNumber(nil)).to.equal(false);
  });

  it('should validate only string values', function() {
    expect(utils.isString(str)).to.equal(true);
    expect(utils.isString(num)).to.equal(false);
    expect(utils.isString(boolTrue)).to.equal(false);
    expect(utils.isString(boolFalse)).to.equal(false);
    expect(utils.isString(arrInt)).to.equal(false);
    expect(utils.isString(arrStr)).to.equal(false);
    expect(utils.isString(obj)).to.equal(false);
    expect(utils.isString(nil)).to.equal(false);
  });

  it('should validate only null values', function() {
    expect(utils.isNull(nil)).to.equal(true);
    expect(utils.isNull(str)).to.equal(false);
    expect(utils.isNull(num)).to.equal(false);
    expect(utils.isNull(boolTrue)).to.equal(false);
    expect(utils.isNull(boolFalse)).to.equal(false);
    expect(utils.isNull(arrInt)).to.equal(false);
    expect(utils.isNull(arrStr)).to.equal(false);
    expect(utils.isNull(obj)).to.equal(false);
  });

  it('should validate only object values', function() {
    expect(utils.isObject(obj)).to.equal(true);
    expect(utils.isObject(nil)).to.equal(false);
    expect(utils.isObject(str)).to.equal(false);
    expect(utils.isObject(num)).to.equal(false);
    expect(utils.isObject(boolTrue)).to.equal(false);
    expect(utils.isObject(boolFalse)).to.equal(false);
    expect(utils.isObject(arrInt)).to.equal(false);
    expect(utils.isObject(arrStr)).to.equal(false);
  });
});