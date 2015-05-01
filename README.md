# q
A tiny library to be used with [browserify](http://browserify.org) that gives arrays rather than NodeLists from DOM queries.

## Installation

```
$ npm install @artcommacode/q --save
```

## Usage

q wraps [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) in one function. It returns arrays rather than NodeLists except when there is a single element in which case it returns the element itself.

``` js
var q = require('@artcommacode/q')

q('ul li')
// => [ <li>...</li>, <li>...</li>, <li>...</li> ]

q('ul li')[0].textContent
// => $1

q('ul li')[0] === q('ul li:first-of-type')
// => true
```

Pass an element in as the second argument to run a query on it:

``` js
var ul = q('ul')
q('li', ul)
// => [ <li>...</li>, <li>...</li>, <li>...</li> ]
```

q will return an empty array if no elements are found:

``` js
q('ul div')
// => []
```

## Tests

```
$ npm install && npm test
```

This will open a tab in your browser to run tests against `test/index.html` with the results displayed in your terminal. If you see `# ok` then it all went well, if there's any errors please submit an [issue](https://github.com/artcommacode/q/issues).
