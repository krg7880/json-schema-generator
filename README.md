json-schema-generator
=====================

JSON schema generated based on draft-v4 of the specification. Note that the full spec if not yet supported. The compiler will be enhanced to support as much as possible. More specifically, there's no support for $ref nodes or special nodes like location (lat, long), etc. These features will be added in future releases or you can always fork and make it better :-)


### Install (GIT)
```bash
git clone https://github.com/krg7880/json-schema-generator
cd json-schema-generator
npm install .
```

### Install as cli (NPM)
Run on the command line:

```bash
npm install -g json-schema-generator
```

Then use (for example):

```bash
#### JSON PATH
json-schema-generator path/to/input.json -o path/to/output.json
#### JSON URL
json-schema-generator https://sample.com/path/to/input.json --jsondir ./source/backup -o ./path/to/dir/
#### JSON STDIN | STDOUT
cat input.json | json-schema-generator > output.json
```

### Install as lib (NPM)
Run on the command line:

```bash
npm install json-schema-generator --save-dev
```

Then, in your project:

```javascript
var jsonSchemaGenerator = require('json-schema-generator'),
    obj = { some: { object: true } },
    schemaObj;

schemaObj = jsonSchemaGenerator(json);
```

### Cli usage
```
Usage: json-schema-generator [<target>|--url <url>|--file <file>|--stdin]

If <target> is specified, it is interpreted as follows: a protocol (like http://) 
means url; anything else is treated as path to a local file. 
If no input file is specified and stdin is provided, stdin is used.

Options:
  --stdin          Use stdin as input.                                              
  --url            Remote json document to use as input.                            
  --file           Local json document to use as input.                             
  --schemadir, -o  Directory (or file, if ending with .json) where the schema will
                   be stored.                                                       
  --jsondir        Directory (or file, if ending with .json) where the source
                   document is copied to. Useful with --url.                        
  --pretty         Whether to use pretty json format. Use --no-pretty for false.
                                                                     [default: true]
  --force, -f      If a destination file already exists, overwrite it.              
  --help, -h       Show this help text.                                             

```

#### Example JSON
```json
{
    "title": "fresh fruit schema v1",
    "type": "object",
    "required": ["skin", "colors", "taste"],
    "properties": {
        "colors": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {
                "type": "string"
            }
        },
        "skin": {
            "type": "string"
        },
        "taste": {
            "type": "number",
            "minimum": 5
        }
    }
}
```


#### Example Output
```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "required": {
      "type": "array",
      "items": {
        "required": [
          
        ],
        "properties": {
          
        }
      }
    },
    "properties": {
      "type": "object",
      "properties": {
        "colors": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "minLength": 1
            },
            "minItems": {
              "type": "number"
            },
            "uniqueItems": {
              "type": "boolean"
            },
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "minLength": 1
                }
              },
              "required": [
                "type"
              ]
            }
          },
          "required": [
            "type",
            "minItems",
            "uniqueItems",
            "items"
          ]
        },
        "skin": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "minLength": 1
            }
          },
          "required": [
            "type"
          ]
        },
        "taste": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "minLength": 1
            },
            "minimum": {
              "type": "number"
            }
          },
          "required": [
            "type",
            "minimum"
          ]
        }
      },
      "required": [
        "colors",
        "skin",
        "taste"
      ]
    }
  },
  "required": [
    "title",
    "type",
    "required",
    "properties"
  ]
}
```

### Background
I created this schema generator to validate JSON responses from APIs. As the JSON API is enhanced and nodes are added or removed from the response, the schema is regenerated and validated against the newly deployed API.

### Tests
To run tests, including fetching documents via HTTP, we've added [node-stubby-server-cli](https://github.com/krg7880/node-stubby-server-cli) to help with serving mock data. The ports for the stub server is defined under *test/helpers/stubby-cli*, in the event the default port is in use, you can change them there.

```bash
npm install -g stubby
```

Install [mocha](https://github.com/mochajs/mocha) globally (as cli) and run 

```bash
npm test
```

### Validating Documents
JSON documents can be validated against schemas using [chai-json-schema](http://chaijs.com/plugins/chai-json-schema). See the tests under [test](https://github.com/krg7880/json-schema-generator/tree/master/test) for example usage.

### Contributors
Thanks to those who have contributed. These kind folks are listed below:

* [nickyout](https://github.com/nickyout)
* [Edward Silverton](https://github.com/edsilv)
* [Tschef](https://github.com/Tschef)


