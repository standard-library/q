// @flow
type ParentElement = Document | HTMLElement;

const toArray = <T>(list: Iterable<T>): T[] => [...list]

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
