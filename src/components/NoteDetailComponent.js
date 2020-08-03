import React from 'react'
import marked from 'marked'

/**
 * Component providing detail of a single note.
 */
export default function NoteDetailComponent (props) {
  if (props.note) {
    const content = marked(props.note.content)

    return (
      <div
        className='content' dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    )
  }
  return <h1>No Content</h1>
}
