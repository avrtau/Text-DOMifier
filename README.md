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
| options.*group* | `Object`  | Grouping options for the elements. | *Optional* | |
| options.group.*elementsPerGroup* | `number`  | Defines a number of elements per group. | *Optional* | 1 |
| options.group.*groupContainer* | `string`  | Element type of a group. | *Optional* | "div" |
| options.group.*groupClasses* | `string` \| `string[]`  | Classes to be added to the group DOM element. | *Optional* | [] |
| options.group.*groupElementClasses* | `string` \| <br>`string[]` \|<br> `string[][]`  | Classes to be added to the elements of the group. | *Optional* | [] |

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

### Element Groups

It is possible to group the elements using the `options.group` object. The DOM element type of each element is defined by `options.elementType` (Default: "div").

| Name | Type | Description | Default |
| ---- | ------- | -------- | ------- |
| group.*elementsPerGroup* | `number`  | Defines a number of elements per group. | 1 |
| group.*groupContainer* | `string`  | Element type of a group. | "div" |
| group.*groupClasses* | `string` \| `string[]`  | Classes to be added to the group DOM element. | [] |
| group.*groupElementClasses* | `string` \| <br>`string[]` \|<br> `string[][]`  | Classes to be added to the elements of the group. | [] |

#### elementsPerGroup: number (Default: 1)
In order to create element grouping `group.elementsPerGroup` needs to be set to a number larger than 1.
```js
const groupOptions = { "elementsPerGroup" : 2 };
const domifier = new DOMifyText ("My three words", {"group": groupOptions});

domifier.DOMElements.forEach(element => console.log(element.outerHTML));
// Output:
// <div><div>My</div><div>three</div></div>
// <div><div>words</div></div>
```

#### groupContainer: string (Default: "div")
Sets a DOM element type for the group container
```js
const groupOptions = {
  "elementsPerGroup" : 2,
  "groupContainer": "p"
};
const domifier = new DOMifyText ("My three words", {"group": groupOptions});

domifier.DOMElements.forEach(element => console.log(element.outerHTML));
// Output:
// <p><div>My</div><div>three</div></p>
// <p><div>words</div></p>
```

#### groupClasses: string \| string[] (Default: [])
Sets the classes for the container element. **NOTE:** The group container inherits the `options.elementClasses`.

`options.elementClasses` is not set:
  
*as an array of strings:*
```js
const groupOptions = {
  "elementsPerGroup" : 2,
  "groupClasses": ["group-class"]
};
```
*as a string:*
```js
const groupOptions = {
  "elementsPerGroup" : 2,
  "groupClasses": "group-class"
};
```

```js
const domifier = new DOMifyText ("My three words", {"group": groupOptions});

domifier.DOMElements.forEach(element => console.log(element.outerHTML));
// Output:
// <div class="group-class"><div>My</div><div>three</div></div>
// <div class="group-class"><div>words</div></div>
```
&nbsp;
`options.elementClasses` is set:
```js
const groupOptions = {
  "elementsPerGroup" : 2,
  "groupClasses": ["group-class"]
};
const domifier = new DOMifyText ("My three words", {"group": groupOptions, "elementClasses": ["element-class"]});
// Output:
// <div class="element-class group-class"><div class="element-class">My</div><div class="element-class">three</div></div>
// <div class="element-class group-class"><div class="element-class">words</div></div>
```

#### groupElementClasses: string \| string[] \| string[][] (Default: [])
Sets the classes for the elements in the group. **NOTE:** All of the elements inherit the `options.elementClasses`.

*As an string*:
All elements in the group will receive the classes
```js
const groupOptions = {
  "elementsPerGroup": 2,
  "groupElementClasses": "group-element-class1 group-element-class2"
};
const domifier = new DOMifyText ("My three words", {"group": groupOptions});
domifier.DOMElements.forEach(element => console.log(element.outerHTML));
//Output:
// <div><div class="group-element-class1 group-element-class2">My</div><div class="group-element-class1 group-element-class2">three</div></div>
// <div><div class="group-element-class1 group-element-class2">words</div></div>
```

*As an array of strings:*
Classes will be assigned based on the index, such that - the first element will receive classes at index 0 of the classes array, the second element will receive classes at index 1 of the classes array, etc.
```js
const groupOptions = {
  "elementsPerGroup": 2,
  "groupElementClasses": ["group-element-class1", "group-element-class2"]
};
const domifier = new DOMifyText ("My three words", {"group": groupOptions});
domifier.DOMElements.forEach(element => console.log(element.outerHTML));
//Output:
// <div><div class="group-element-class1">My</div><div class="group-element-class2">three</div></div>
// <div><div class="group-element-class1">words</div></div>
```

*As a multi-dimentional array:*
Classes will be assigned based on the index.
```js
const groupOptions = {
  "elementsPerGroup": 2,
  "groupElementClasses": [["group-element-class1a", "group-element-class1b"], "group-element-class2"]
};
const domifier = new DOMifyText ("My three words", {"group": groupOptions});
domifier.DOMElements.forEach(element => console.log(element.outerHTML));
//Output:
// <div><div class="group-element-class1a group-element-class1b">My</div><div class="group-element-class2">three</div></div>
// <div><div class="group-element-class1a group-element-class1b">words</div></div>
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
| classes | `string` \| `Array.<string>`  | A string or an array of classes to be added. |


##### Returns


- `DOMifier`  - An instance of DOMifier (for chaining purposes).
```javascript
const domifier = new DOMifyText("My Text", {elementClasses: ["class1", "class2"]});

// Add a class "class3" to the elements and log the result:
domifier.addClasses(["class3"]).DOMElements.forEach(e => console.log(e.outerHTML));
```
*or as a string:*
```js
domifier.addClasses("class3").DOMElements.forEach(e => console.log(e.outerHTML));
// Output:
// <div class="class1 class2 class3">My</div>
// <div class="class1 class2 class3">Text</div>
```


&nbsp;
&nbsp;

*Documentation generated with help from [doxdox](https://github.com/neogeek/doxdox).*
