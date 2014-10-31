

<!-- Start lib/index.js -->

## jsondir

Specify a directory where a remote
JSON will be stored after downloading
the resource.

CLI Flag
--jsondir

## schemadir

Specify a directory where the generated
schema will be stored.

CLI Flag
--schemadir

## file

Specify a local JSON document that is
used to generate the schema.

CLI Flag
--file

## url

Specfiy a remote JSON document to fetch
and generate it's schema.

CLI Flag
--url

## fetchResource(url)

Fetches a remote JSON document and generate
the schema based on the contents of the remote
resource. If an output directory is specified,
the document will be saved locally.

### Params:

* **String** *url* The location of the remote   resource

### Return:

* **void** 

## readFile(filepath)

Reads the specified JSON file from the 
filesystem which is used to generate 
the schema. 

### Params:

* **String** *filepath* Path to JSON    document to load.

### Return:

* **void** 

## writeFile(contents, file)

Writes the given data to the specified
file location.

### Params:

* **String** *contents* The data to write to the FS
* **String** *file* The file to write the data to

### Return:

* **void** 

## getName(str)

Get the name of the JSON resource so the schema 
matches the source. The .json extension is added
if it's missing from the filename.

### Params:

* **String** *str* File name

### Return:

* **String** The name of the file only.

<!-- End lib/index.js -->

