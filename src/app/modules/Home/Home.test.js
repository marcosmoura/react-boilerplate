import test from 'ava'
import React from 'react'
import { render } from 'enzyme'

import Home from './Home'

test('should title have the right content', t => {
  const wrapper = render(<Home />)
  const fooInner = wrapper.find('h1')

  t.is(fooInner.text(), 'Home')
})
