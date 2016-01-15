const toArray = (list) => [].slice.call(list)

const elemError = (e) => {
  throw new Error(`"${e}" does\'t exist in the document`)
}

const getRoot = (e) => {
  if (!e) return document
  return document.body.contains(e) ? e : elemError(e)
}

const car = (xs) => xs[0]

export const query = (q, e) => {
  const root = getRoot(e)
  return toArray((root).querySelectorAll(q))
}

export const queryOne = (q, e) => car(query(q, e))
