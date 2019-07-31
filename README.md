# Text DOMifier
Creates an Array of DOMElements for every word in a given text.

## Getting Started
### Option 1:
Clone the repo and include the DOMifyText.min.js in the `<head>` of your HTML file:
```html
<script src="../your/scripts/directory/path/DOMifyText.min.js"></script>
```

### Option 2:
Get the latest build from a CDN (jsdelivr.net)
```html
<script src="https://cdn.jsdelivr.net/gh/avrtau/Text-DOMifier/min/DOMifyText.min.js"></script>
```

## Usage
### Instantiation
#### new DOMifyText (text[, options])
##### Parameters

| Name | Type | Description |  | Default |
| ---- | ------- | -------- | -------- | ------- |
| text | `string`  | Text to be DOMified. | &nbsp; | &nbsp; |
| options | `Object`  | Parameters for the created elements. | *Optional* | &nbsp; |
| options.*elementType* | `string`  | Element type to be created. | *Optional* | "div" |
| options.*elementClasses* | `string` \| `string[]`  | Classes to be added to the DOM Element. | *Optional* | [] |
| options.*delimiter* | `string` \| `RegExp`  | A delimiter or a regular expression to divide words into elements. | *Optional* | " " (space) |
| options.*setIDs* | `bool`  | When true, random(ish) IDs will be added to the generated elements. | *Optional* | false |

Create a new instance of the `DOMifyText` object:
```javascript
const domifier = new DOMifyText("My Text");
```

#### A new instance with defaults
This will dress each word in a `div` with no classes or ids added
```javascript
const domifier = new DOMifyText("My Text");
```

#### Specifying a DOM Element
Will dress each word in the specified DOM Element type
```javascript
const domifier = new DOMifyText("My Text", {"elementType": "p"}) // will create <p> elements

domifier.DOMElements.forEach(element => console.log(element.outerHTML));
// Output:
// <p>My</p>
// <p>Text</p>
```

#### Specifying classes
Will add a class attribute to each element with specified classes
  
*as an array of strings:*
```javascript
const domifier = new DOMifyText("My Text", {"classes": ["class1", "class2"]});
```
*as a string:*
```js
const domifier = new DOMifyText("My Text", {"classes": "class1 class2"});
```
```js
domifier.DOMElements.forEach(element => console.log(element.outerHTML));
// Output:
// <div class="class1 class2">My</div>
// <div class="class1 class2">Text</div>
```

#### Specifying a delimiter
Sets a delimiter by which to divide the words into elements. *(Default: " ")*

##### Delimit by a string:
```javascript
const domifier = new DOMifyText("First text,Second text", {"delimiter": ","});

domifier.DOMElements.forEach(element => console.log(element.outerHTML));
// Output:
// <div>First text</div>
// <div>Second text</div>
```

##### Delimit by a RegEx:
```javascript
const domifier = new DOMifyText("First text,Second text", {"delimiter": /[\s,]/});
domifier.DOMElements.forEach(element => console.log(element.outerHTML));
// Output:
// <div>First</div>
// <div>text</div>
// <div>Second</div>
// <div>text</div>
```

#### Random(ish) generated ids
Will add a random (`Math.random()`) id to each element
```javascript
const domifier = new DOMifyText("My Text", {"withIDs": true});

domifier.DOMElements.forEach(element => console.log(element.outerHTML));
// Output:
// <div id="o6ojz4kjw7q">new</div>
// <div id="8m6uebm9pia">text</div>
```


### Getters / Setters
#### DOMElements() 

Gets an Array of DOM elements

##### Returns

- `Array.<DOMElement>`  - An Array of DOMElements created from the intial text.

```javascript
const elementOptions = {
  elementType: "p",
  elementClasses: ["class1", "class2"],
  setIDs: true
};
const domifier = new DOMifyText("My Text", elementOptions);

console.log(domifier.DOMElements);
// Output:
// (2) [p#sk85au57ax.class1.class2, p#iuanim48dz.class1.class2]
//      0: p#sk85au57ax.class1.class2
//      1: p#iuanim48dz.class1.class2
```


#### text(newText) 

Sets a text to be DOMified.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newText | `string`  | Text to be DOMified. |

```javascript
const domifier = new DOMifyText("");
domifier.text = "My Text";

domifier.DOMElements.forEach(e => console.log(e.outerHTML));
// Output:
// <div>My</div>
// <div>Text</div>
```

#### classes(newClasses) 

Sets new classes

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newClasses | `Array.<sting>`  | new Element classes to be set. |

```javascript
const domifier = new DOMifyText("My Text", {elementClasses: ["class1", "class2"]});

// Change classes to "class3"
domifier.classes = ["class3"];

domifier.DOMElements.forEach(e => console.log(e.outerHTML));
// Output:
// <div class="class3">My</div>
// <div class="class3">Text</div>
```

#### delimiter(newDelimiter)

Sets a new delimiter

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDelimiter | `string`  | A new delimiter to be set. |

```javascript
const domifier = new DOMifyText("Fist text,Second text");

domifier.DOMElements.forEach(e => console.log(e.outerHTML));
// Output:
// <div>First</div>
// <div>text,Second</div>
// <div>text</div

domifier.delimiter = ",";
// Output:
// <div>First text</div>
// <div>Second text</div>
```

### Methods

#### addClasses(classes) 

Appends more classes to the Elements.


##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| classes | `Array.<string>`  | Array of classes to be added. |


##### Returns


- `DOMifier`  - An instance of DOMifier (for chaining purposes).
```javascript
const domifier = new DOMifyText("My Text", {elementClasses: ["class1", "class2"]});

// Add a class "class3" to the elements and log the result:
domifier.addClasses(["class3"]).DOMElements.forEach(e => console.log(e.outerHTML));

// Output:
// <div class="class1 class2 class3">My</div>
// <div class="class1 class2 class3">Text</div>
```


&nbsp;
&nbsp;

*Documentation generated with help from [doxdox](https://github.com/neogeek/doxdox).*
