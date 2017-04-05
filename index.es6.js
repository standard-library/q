/* @flow */

type ParentElement = Document | HTMLElement;

const toArray = (list) => [].slice.call(list)

// workaround for strip-types issue with arrow functions and generics
const car = function <T>(xs: Array<T>): T {return xs[0]}

const elemError = (e: ParentElement) => {
  throw new Error(`"${e.toString()}" does\'t exist in the document`)
}

const getRoot = (e: ParentElement): ParentElement => {
  if (e === document) return e
  return document.body.contains(e) ? e : elemError(e)
}

export const queryChildren = (e: ParentElement, q: string): Array<HTMLElement> => {
  const root = getRoot(e)
  return toArray((root).querySelectorAll(q))
}

export const queryChild = (e: ParentElement, q: string): ?HTMLElement => {
  return car(queryChildren(e, q))
}

export const query = (q: string): Array<HTMLElement> => {
  return queryChildren(document, q)
}

export const queryOne = (q: string): ?HTMLElement => queryChild(document, q)
