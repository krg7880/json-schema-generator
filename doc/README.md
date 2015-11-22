

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

## buildPrimitive(tree, node)

Inspect primitatives and apply the correct type
and mark as required if the element contains a value.

### Params:

* **Object** *tree* Schema which represents the node
* **Node** *node* The JSON node being inspected

### Return:

* void

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

* void

<!-- End lib/ast.js -->




<!-- Start lib/compiler.js -->

## Compiler

Schema generator using a AST
tree.

## generate(tree, schema, parent)

Generates a JSON schema based on the provided AST tree.

### Params:

* **Object** *tree* AST
* **Object** *schema* The schema object
* **Object** *parent* Schema node parent object

### Return:

* void

## compile(tree)

Initates compiling the given AST into a
JSON schema.

### Params:

* **Object** *tree* AST object

### Return:

* void

<!-- End lib/compiler.js -->




<!-- Start lib/index.js -->

<!-- End lib/index.js -->




<!-- Start lib/utils.js -->

<!-- End lib/utils.js -->

