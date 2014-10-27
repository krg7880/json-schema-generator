json-schema-generator
=====================

Generates draft v4 schema from a local file or a remote JSON url. 

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


