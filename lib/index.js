'use strict';

var Generator = require('./generator');
var utils = require('./utils');
var argv = require('optimist').argv;
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var request = require('request');
var parser = require('json-promise');

// cli arguments
var jsondir = argv.jsondir;
var schemadir = argv.schemadir;
var file = argv.file;
var url = argv.url;
var disableAdditionalProperties = argv.disableAdditionalProperties || null;

if (!schemadir) {
  throw new Error('Please specfiy an output directory to store the generated schema!');
} 

if (!file && !url) {
  throw new Error('Please specify a local file (path) or a URL of a JSON document');
}

mkdirp.sync(schemadir);

var logger = function(msg) {
  console.log("\n", msg);
};

/**
Fetches a remote JSON document and generate
the schema based on the contents of the remote
resource. If an output directory is specified,
the document will be saved locally.

@param {String} url The location of the remote
  resource
@return void
*/
var fetchResource = function(url, jsondir) {
  logger('Fetching URL resource: ' + url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parser.parse(body)
        .then(function(data) {
          var filename = getName(url);
          process(data, filename);
          if (jsondir) {
            writeFile(body, jsondir + '/' + filename);
          }
        }).catch(function(e) {
          throw e;
        });
    } else {
      logger('There was an error loading the requested resource');
      logger('>>> ' + url);

      if (error) {
        logger(e.toString('utf8'));
      }
    }
  });
};

/**
Reads the specified JSON file from the 
filesystem which is used to generate 
the schema. 

@param {String} filepath Path to JSON 
  document to load.
@return void
*/
var readFile = function(filepath) {
  var body = '';
  reader = fs.createReadStream(filepath);
  reader.on('data', function(chunks) {
    body += chunks;
  }).on('end', function() {
    parser.parse(body)
      .then(function(data) {
        var filename = getName(filepath);
        process(data, filename);
      }).catch(function(e) {
        throw e;
      });

  }).on('error', function(e) {
    throw e;
  });
}

/**
Writes the given data to the specified
file location.

@param {String} contents The data to write to the FS
@param {String} file The file to write the data to
@return void
*/
var writeFile = function(contents, file) {
  file = path.resolve(path.normalize(file));
  parser.stringify(contents)
    .then(function(data) {
      var writer = fs.createWriteStream(file);
      var buff = new Buffer(Buffer.byteLength(data));
      buff.write(data.toString('utf8'));
      writer.write(buff);
      writer.close();
      logger('Created file: ' + file);
    }).catch(function(e) {
      throw e;
    })
};

/**
Get the name of the JSON resource so the schema 
matches the source. The .json extension is added
if it's missing from the filename.

@param {String} str File name
@return {String} The name of the file only.
*/
var getName = function(str) {
  var name = str.substr(str.lastIndexOf('/'), str.length);
  if (name.lastIndexOf('.') === -1) {
    name += '.json';
  }
  
  return name;
}

var process = function(data, filename) {
  var generator = new Generator();
  generator.disableAdditionalProperties(disableAdditionalProperties);
  var schema = generator.generate(data);
  var filepath = schemadir + '/' + filename;
  writeFile(schema, filepath);
}

if (file) {
  readFile(file);
} else {
  if (jsondir) {
    mkdirp.sync(jsondir);
  } 

  fetchResource(url, jsondir);
}