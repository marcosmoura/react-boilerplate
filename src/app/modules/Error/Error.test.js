import test from 'ava'
import React from 'react'
import { render } from 'enzyme'

import ErrorPage from './Error'

test('should title have the right content', t => {
  const wrapper = render(<ErrorPage />)
  const fooInner = wrapper.find('h1')

  t.is(fooInner.text(), 'Error')
})
