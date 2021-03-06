# q'

A tiny library to be used with [browserify](http://browserify.org) (or [webpack](http://webpack.github.io)) that returns arrays rather than NodeLists from DOM queries and allows for composable queries.

Adapted from the original [`q`](https://github.com/artcommacode/q) by [artcommacode](https://github.com/artcommacode), extracting optional parameters into additional functions.

## Installation

``` shell
npm install @standard-library/q-prime --save
# or
yarn add @standard-library/q-prime
```

## Usage

q' wraps [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) into four exported functions; `query`, which returns arrays rather than NodeLists and `queryOne`, which returns a single element. Two additional functions `queryChildren` and `queryChild` allow scoping to a parent element.

``` js
import { query, queryOne, queryChildren, queryChild } from '@standard-library/q-prime'

query('ul li')
// => [ <li>...</li>, <li>...</li>, <li>...</li> ]

query('ul li')[0].textContent
// => $1

queryOne('ul li')
// => <li>...</li>

queryOne('ul li') === query('ul li')[0]
// => true
```

You can compose queries with `queryChildren` or `queryChild`, by passing an element as the first argument:

``` js
const ul = queryOne('ul')
queryChildren(ul, 'li')
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
queryChildren(li, 'div')
// => Error: "not_an_element" does't exist in the document
```

## Tiny

q is only 29 lines short, small enough to fit in this README:

``` js
type ParentElement = Document | HTMLElement;

const toArray = (list) => [].slice.call(list)

const first = <T>(xs: T[]): T => xs[0]

const elemError = (e: ParentElement): void => {
  throw new Error(`"${String(e)}" does\'t exist in the document`)
}

const getRoot = (e: ParentElement): ?ParentElement => {
  if (e === document) return e
  return document && document.body && document.body.contains(e) ? e : elemError(e)
}

export const queryChildren = (e: ParentElement, q: string): HTMLElement[] => {
  const root = getRoot(e)
  return root ? toArray(root.querySelectorAll(q)) : []
}

export const queryChild = (e: ParentElement, q: string): ?HTMLElement => {
  return first(queryChildren(e, q))
}

export const query = (q: string): HTMLElement[] => {
  return queryChildren(document, q)
}

export const queryOne = (q: string): ?HTMLElement => queryChild(document, q)
```

A couple things to note here:

1. I'm using [flow](http://flowtype.org) for static type checking.
2. q' doesn't shim `querySelectorAll` and as such is meant for modern (post IE7 or post IE8 if you're using CSS 3 selectors) browsers.

## Tests

```
$ npm install && npm test
```

This will open a tab in your browser to run tests against `test/index.html` with the results displayed in your terminal. If you see `# ok` then it all went well, if there are any errors please submit an [issue](https://github.com/standard-library/q/issues).
