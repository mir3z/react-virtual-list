# React Virtual List

Virtual vertical list component in React. Displays thousands of items without breaking a sweat!

## Overview

This component allows to create very long lists that work extremely fast. This is achieved by rendering only the
part of the list visible on the viewport.

## Demo

* [Interactive Demo](http://mir3z.github.io/react-virtual-list/demo/)

## Usage

The library is released as UMD module. Just load it in any way you like. If you include it directly on the web page
it is exposed as `VirtualList` global.

The component accepts the following props:

* `items` (`array`, default: `[]`) - array of all list items.
* `itemFactory` (`function`, required) - the function that receives item as param and renders single list item as `ReactElement`.
* `itemHeight` (`number`, required) - the height of the item in pixels. It has to be set in CSS rules as well.
* `bufferSize` (`number`, default: `0`) - the number of items that may be rendered before and after the visible part of the list.
* `viewport` (`DOMElement`, default: `window`) - the element that contains the list. Use this if you want to place list inside a scrollable container.
* `tagName` (`string`, default: `ul`) - tag name of the container that contains list items.

### Example

```javascript
var items = [];

for (var i = 0; i < 1000; i++) {
    items.push({ number: i });
}

function createItem(item, props, state) {
    return <li key={ item.number }>Item #{ item.number }><li>;
}

<VirtualList items={ items } itemFactory={ createItem } itemHeight={ 100 } />
```

## License
The MIT License (MIT). Copyright (c) 2016 mirz (mirz.hq@gmail.com)