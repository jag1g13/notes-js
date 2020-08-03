/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'

import NoteDetailComponent from './NoteDetailComponent.js'

test('displays default message in empty state', () => {
  const { getByText } = render(<NoteDetailComponent />)
  const heading = getByText('No Content')
  expect(heading).toBeInTheDocument()
})

test('displays note content', () => {
  const note = {
    content: '# TEST HEADING'
  }

  const { getByText } = render(<NoteDetailComponent note={note} />)
  const heading = getByText('TEST HEADING')
  expect(heading).toBeInTheDocument()
})
