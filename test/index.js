var test = require('tape')
var q = require('../')

test('test q', function (t) {
  var ul = q('ul')
  var li
  t.equal(q('ul li').length, 3)
  t.deepEqual(q('ul li'), q('li', ul))
  t.equal(q('ul li')[0].textContent, '$1')
  t.deepEqual(q('ul div'), [])
  t.deepEqual(q('div', li), [])
})
