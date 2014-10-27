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