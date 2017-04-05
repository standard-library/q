# q
A tiny library to be used with [browserify](http://browserify.org) (or [webpack](http://webpack.github.io)) that returns arrays rather than NodeLists from DOM queries and allows for composable queries.

## Installation

```
$ npm install @artcommacode/q --save
```

## Usage

q wraps [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) into two exported functions; `query`, which returns arrays rather than NodeLists and `queryOne`, which returns a single element.

``` js
import { query, queryOne } from '@artcommacode/q'

query('ul li')
// => [ <li>...</li>, <li>...</li>, <li>...</li> ]

query('ul li')[0].textContent
// => $1

queryOne('ul li')
// => <li>...</li>

queryOne('ul li') === query('ul li')[0]
// => true
```

You can compose queries by passing an element as the second argument:

``` js
const ul = queryOne('ul')
query('li', ul)
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
query('div', li)
// => Error: "not_an_element" does't exist in the document
```

## Tiny

q is only 20 lines short, small enough to fit in this README:

``` js
const toArray = <T>(list: Iterable<T>): T[] => [...list]

const first = <T>(xs: T[]): T => xs[0]

const elemError = (e: mixed): void => {
  throw new Error(`"${String(e)}" does\'t exist in the document`)
}

const getRoot = (e?: HTMLElement): ?(Document | HTMLElement) => (
  !e ? document : (document && document.body && document.body.contains(e) ? e : elemError(e))
)

export const query = (q: string, e?: HTMLElement): HTMLElement[] => {
  const root = getRoot(e)
  return root ? toArray(root.querySelectorAll(q)) : []
}

export const queryOne = (q: string, e?: HTMLElement): ?HTMLElement => (
  first(query(q, e))
)
```

A couple things to note here:

1. I'm using [flow](http://flowtype.org) for static type checking.
2. q doesn't shim `querySelectorAll` and as such is meant for modern (post IE7 or post IE8 if you're using CSS 3 selectors) browsers.

## Tests

```
$ npm install && npm test
```

This will open a tab in your browser to run tests against `test/index.html` with the results displayed in your terminal. If you see `# ok` then it all went well, if there are any errors please submit an [issue](https://github.com/artcommacode/q/issues).

## 1.0

The 2.0 release of q is a complete rewrite, if you're still using 1.0 you can find the previous docs [here](https://github.com/artcommacode/q/blob/942d1a3dab2e7dec6f8588e02e80e4018e13084b/README.md).
