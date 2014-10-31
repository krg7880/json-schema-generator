json-schema-generator
=====================

JSON schema generated based on draft-v4 of the specification. Note that the full spec if not yet supported. The compiler will be enhanced to support as much as possible. More specifically, there's no support for $ref nodes or special nodes like location (lat, long), etc. These features will be added in future releases or you can always fork and make it better :-)


### Install (GIT)
- git clone https://github.com/krg7880/json-schema-generator
- cd json-schema-generator
- npm install .

### Install (NPM)
- npm install [json-schema-generator](https://www.npmjs.org/package/json-schema-generator)

### Usage 
```bash
#### JSON URL
node index.js --schemadir ${PWD}/schema --jsondir ${PWD}/json \
	 --url <url of json document>

#### JSON PATH 
node index.js --schemadir ${PWD}/schema \
	 --file <path to json document>
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

### Validating Documents
JSON documents can be validated against schemas using [chai-json-schema](http://chaijs.com/plugins/chai-json-schema). See the tests under [test](https://github.com/krg7880/json-schema-generator/tree/master/test) for example usage.