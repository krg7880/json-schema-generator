

<!-- Start lib/ast.js -->

## utils

Generates an Abstract Syntax Tree
used for generating the schema.

## AST

Abstract Syntax Tree Class

### Return:

* **Object** 

## generateHash(value)

Computes the hex hash of the given value

### Params:

* **Mixed** *value* Value to hash

### Return:

* **String** HEX value.

## isAllSimilarObject(node)

Checks if the elements in the given node are all
equal. 

### Params:

* **Object** *node* JSON node to inspect

### Return:

* **Object** 

## buildPrimative(tree, node)

Inspect primitatives and apply the correct type
and mark as required if the element contains a value.

### Params:

* **Object** *tree* Schema which represents the node
* **Node** *node* The JSON node being inspected

### Return:

* **void** 

## buildObject(tree, node)

Inspect object properties and apply the correct
type and mark as required if the element has set 
properties.

### Params:

* **Object** *tree* Schema which represents the node
* **Node** *node* The JSON node being inspected

## buildObject(tree, node)

Inspect array elements apply the correct
type and mark as required if the element has 
set properties.

### Params:

* **Object** *tree* Schema which represents the node
* **Node** *node* The JSON node being inspected

## build(json)

Initiates generating the AST from the 
given JSON document.

### Params:

* **Object** *json* JSON object

### Return:

* **void** 

<!-- End lib/ast.js -->




<!-- Start lib/compiler.js -->

## generate(tree, schema, parent)

Generates a JSON schema based on the provided AST tree.

### Params:

* **Object** *tree* AST
* **Object** *schema* The schema object
* **Object** *parent* Schema node parent object

### Return:

* **void** 

## compile(tree)

Initates compiling the given AST into a
JSON schema.

### Params:

* **Object** *tree* AST object

### Return:

* **void** 

<!-- End lib/compiler.js -->




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




<!-- Start lib/utils.js -->

<!-- End lib/utils.js -->

