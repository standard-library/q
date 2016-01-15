import test from 'tape'
import { query, queryOne } from '../'

test('test q', function (t) {
  const ul = queryOne('ul')
  const li = 'not_an_element'
  t.equal(query('ul li').length, 3)
  t.equal(query('ul li')[0].textContent, '$1')
  t.deepEqual(queryOne('ul li:first-of-type'), query('ul li')[0], queryOne('ul li'))
  t.deepEqual(query('ul li'), query('li', ul))
  t.deepEqual(query('ul div'), [])
  t.throws(() => query('div', li))
  t.end()
})
