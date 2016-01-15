/* @flow */

const toArray = (list) => [].slice.call(list)

// workaround for strip-types issue with arrow functions and generics
const car = function <T>(xs: Array<T>): T {return xs[0]}

const elemError = (e) => {
  throw new Error(`"${e}" does\'t exist in the document`)
}

const getRoot = (e: ?HTMLElement): Document | HTMLElement => {
  if (!e) return document
  return document.body.contains(e) ? e : elemError(e)
}

export const query = (q: string, e: HTMLElement): Array<HTMLElement> => {
  const root = getRoot(e)
  return toArray((root).querySelectorAll(q))
}

export const queryOne = (q: string, e: HTMLElement): ?HTMLElement => car(query(q, e))
