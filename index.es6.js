// @flow
const toArray = <T>(list: Iterable<T>): T[] => [...list]

const first = <T>(xs: T[]): T => xs[0]

const elemError = (e: mixed): void => {
  throw new Error(`"${String(e)}" does\'t exist in the document`)
}

const getRoot = (e: ?HTMLElement): ?(Document | HTMLElement) => (
  !e ? document : (document && document.body && document.body.contains(e) ? e : elemError(e))
)

export const query = (q: string, e: ?HTMLElement): HTMLElement[] => {
  const root = getRoot(e)
  return root ? toArray(root.querySelectorAll(q)) : []
}

export const queryOne = (q: string, e: ?HTMLElement): ?HTMLElement => (
  first(query(q, e))
)
