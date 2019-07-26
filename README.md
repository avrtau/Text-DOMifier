# Text DOMifier


## Constructor
### constructor(text[, elementType&#x3D;&quot;div&quot;, classes, withIDs]) 

Create a DOMifier




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| text | `string`  | Text to be DOMified. | &nbsp; |
| elementType&#x3D;&quot;div&quot; | `string`  | Element type to be created. | *Optional* |
| classes | `Array.<string>`  | Classes to be added to the DOM Element. | *Optional* |
| withIDs | `bool`  | When true, random IDs will be added to the generated elements. | *Optional* |



## Getters / Setters

### DOMElements() 

Gets an Array of DOM elements


##### Returns


- `Array.<DOMElement>`  An Array of DOMElements created from the intial text.



### text(newText) 

Sets a text to be DOMified.


##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newText | `string`  | Text to be DOMified. | &nbsp; |



### classes(newClasses) 

Sets new classes


##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newClasses | `Array.<sting>`  | new Element classes to be set. | &nbsp; |



## Methods

### addClasses(classes) 

Appends more classes to the Elements.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| classes | `Array.<string>`  | Array of classes to be added. | &nbsp; |




##### Returns


- `DOMifier`  - An instance of DOMifier (for chaining purposes).




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
