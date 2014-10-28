json-schema-generator
=====================

First pass at creating a generator for generating JSON schema based on draft v4. Please not that this generator does not support all of the features defined in v4 of the draft. More specifically, there's not support for $ref nodes or special nodes like location (lat, long), etc. These features will be added in future releases or you can always fork and make it better :-)


### Install
git clone https://github.com/krg7880/json-schema-generator

cd json-schema-generator

npm install .

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
I created this schema generator to validate the responses from an API I created. As the API is enhanced and nodes are added or removed, the schema is regenerated and validated against the newly deployed API.

### Validating Documents
JSON documents can be validated against schemas using [chai-json-schema](http://chaijs.com/plugins/chai-json-schema). 

See the tests under (/test) for example usage.