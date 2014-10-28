#!/usr/bin/env node

var Generator = require('./lib/generator');
var utils = require('./lib/utils');
var argv = require('optimist').argv;
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var request = require('request');

if (!argv.schemadir) {
  throw new Error('Please specfiy an output directory to store the generated schema!');
} 

if (!argv.file && !argv.url) {
  throw new Error('Please specify a local file (path) or a URL of a JSON document');
}

mkdirp.sync(argv.schemadir);

var logger = function(msg) {
  console.log("\n", msg);
};

var writeFile = function(data, file) {
  var writer = fs.createWriteStream(file);
  data = utils.isString(data) ? data : JSON.stringify(data);
  var buff = new Buffer(Buffer.byteLength(data));
  buff.write(data.toString('utf8'));
  writer.write(buff);
  writer.close();
  logger('Wrote schema: ' + file);
}

var setName = function(str) {
  var name = str.substr(str.lastIndexOf('/'), str.length);
  if (name.lastIndexOf('.') === -1) {
    name += '.json';
  }
  
  return name;
}

var process = function(data, filename) {
  var generator = new Generator();
  var schema = generator.generate(data);
  var filepath = path.resolve(path.normalize(argv.schemadir + '/' + filename));
  writeFile(schema, filepath);
}

if (argv.file) {
  var data = '';
  reader = fs.createReadStream(argv.file);
  reader.on('data', function(chunks) {
    data += chunks;
  }).on('end', function() {
    var filename = setName(argv.file);
    process(JSON.parse(data.toString('utf8')), filename);
  }).on('error', function(e) {
    throw e;
  });
} else {
  if (argv.jsondir) {
    mkdirp.sync(argv.jsondir);
  } 

  logger('Fetching URL resource: ' + argv.url);

  request(argv.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = (utils.isString(body)) ? JSON.parse(body) : body;
      var filename = setName(argv.url);
      process(body, filename);
      if (argv.jsondir) {
        writeFile(body, argv.jsondir + '/' + filename);
      }
    } else {
      logger('There was an error loading the requested resource');
      logger('>>> ' + argv.url);
      if (error) {
        logger(e.toString('utf8'));
      }
    }
  })
}

