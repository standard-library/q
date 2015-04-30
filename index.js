function toArray(nodeList) {
  return [].slice.call(nodeList)
}

module.exports = function q(query, element) {
  var root = element && document.body.contains(element) ? element : document
  var elements = toArray((root).querySelectorAll(query))
  return elements.length === 1 ? elements[0] : elements
}
