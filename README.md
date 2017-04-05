# q

A tiny library to be used with [browserify](http://browserify.org) (or [webpack](http://webpack.github.io)) that returns arrays rather than NodeLists from DOM queries and allows for composable queries.

Adapted from the original [`q`](https://github.com/artcommacode/q) by [artcommacode](https://github.com/artcommacode), extracting optional parameters into additional functions.

## Installation

```
$ npm install @standard-library/q --save
```

## Usage

q wraps [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) into four exported functions; `query`, which returns arrays rather than NodeLists and `queryOne`, which returns a single element. Two additional functions `queryChildren` and `queryChild` allow scoping to a parent element.

``` js
import { query, queryOne, queryChildren, queryChild } from '@standard-library/q'

query('ul li')
// => [ <li>...</li>, <li>...</li>, <li>...</li> ]

query('ul li')[0].textContent
// => $1

queryOne('ul li')
// => <li>...</li>

queryOne('ul li') === query('ul li')[0]
// => true
```

You can compose queries with `queryChildren` or `queryChild`, by passing an element as the second argument:

``` js
const ul = queryOne('ul')
queryChildren('li', ul)
// => [ <li>...</li>, <li>...</li>, <li>...</li> ]
```

`query` will return an empty array if no elements are found and `queryOne` will return `undefined`:

``` js
query('ul div')
// => []

queryOne('ul div')
// => undefined
```

q will throw an error if you try to run a query on an element that doesn't exist:

``` js
const li = 'not_an_element'
queryChildren('div', li)
// => Error: "not_an_element" does't exist in the document
```

## Tiny

q is only 30 lines short, small enough to fit in this README:

``` js
const toArray = (list) => [].slice.call(list)

const car = <T>(xs: Array<T>): T => xs[0]

const elemError = (e: ParentElement) => {
  throw new Error(`"${e.toString()}" does\'t exist in the document`)
}

const getRoot = (e: ParentElement): ParentElement => {
  if (e === document) return e
  return document.body.contains(e) ? e : elemError(e)
}

export const queryChildren = (q: string, e: ParentElement): Array<HTMLElement> => {
  const root = getRoot(e)
  return toArray((root).querySelectorAll(q))
}

export const queryChild = (q: string, e: ParentElement): ?HTMLElement => {
  return car(queryChildren(q, e))
}

export const query = (q: string): Array<HTMLElement> => {
  return queryChildren(q, document)
}

export const queryOne = (q: string): ?HTMLElement => queryChild(q, document)
```

A couple things to note here:

1. I'm using [flow](http://flowtype.org) for static type checking.
2. q doesn't shim `querySelectorAll` and as such is meant for modern (post IE7 or post IE8 if you're using CSS 3 selectors) browsers.

## Tests

```
$ npm install && npm test
```

This will open a tab in your browser to run tests against `test/index.html` with the results displayed in your terminal. If you see `# ok` then it all went well, if there are any errors please submit an [issue](https://github.com/standard-library/q/issues).

## 1.0

The 2.0 release of q is a complete rewrite, if you're still using 1.0 you can find the previous docs [here](https://github.com/standard-library/q/blob/942d1a3dab2e7dec6f8588e02e80e4018e13084b/README.md).
