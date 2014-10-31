json-schema-generator
=====================

JSON schema generated based on draft-v4 of the specification. Note that the full spec if not yet supported. The compiler will be enhanced to support as much as possible. More specifically, there's no support for $ref nodes or special nodes like location (lat, long), etc. These features will be added in future releases or you can always fork and make it better :-)


### Install (GIT)
- git clone https://github.com/krg7880/json-schema-generator
- cd json-schema-generator
- npm install .

### Install (NPM)
- npm install json-schema-generator

### Usage 
```bash
# JSON URL
node index.js --schemadir ${PWD}/schema --jsondir ${PWD}/json \
	 --url <url of json document>

# JSON PATH
node index.js --schemadir ${PWD}/schema --jsondir ${PWD}/json \
	 --file <path to json document>
```

### Background
I created this schema generator to validate JSON responses from APIs. As the JSON API is enhanced and nodes are added or removed from the response, the schema is regenerated and validated against the newly deployed API.

### Validating Documents
JSON documents can be validated against schemas using [chai-json-schema](http://chaijs.com/plugins/chai-json-schema). See the tests under [test](https://github.com/krg7880/json-schema-generator/tree/master/test) for example usage.