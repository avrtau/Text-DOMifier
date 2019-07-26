# Untitled Project 



### DOMifyText.js


#### constructor(text[, elementType, classes, withIDs]) 

Create a DOMifier




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| text | `string`  | - Text to be DOMified. | &nbsp; |
| elementType | `string`  | = div] - Element type to be created. | *Optional* |
| classes | `Array.<string>`  | - Classes to be added to the DOM Element. | *Optional* |
| withIDs | `bool`  | - When true, random IDs will be added to the generated elements. | *Optional* |




##### Returns


- `Void`



#### DOMElements() 

Gets an Array of DOM elements






##### Returns


- `Array.&lt;DOMElement&gt;`  - An Array of DOMElements created from the intial text.



#### text(newText) 

Sets a text to be DOMified.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newText | `string`  | - Text to be DOMified. | &nbsp; |




##### Returns


- `Void`



#### classes(newClasses) 

Sets new classes




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newClasses | `Array.<sting>`  | - new Element classes to be set. | &nbsp; |




##### Returns


- `Void`



#### addClasses(classes) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| classes | `Array.<string>`  | - Appends more classes to the Elements. | &nbsp; |




##### Returns


- `DOMifier`  - An instance of DOMifier (for chaining purposes).




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
