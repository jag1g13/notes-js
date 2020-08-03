import React from 'react'

import NoteListItemComponent from './NoteListItemComponent.js'

/**
 * Component providing a list of note items.
 */
export default function NoteListComponent (props) {
  const listItems = props.notes.map((note, index) =>
    <NoteListItemComponent key={index} id={index} select_note={props.select_note} selected={index === props.selected_note} note={note} />
  )

  return (
    <div>
      <button className='button is-fullwidth is-primary' onClick={props.handleRefresh}>Refresh</button>
      <ul>{listItems}</ul>
    </div>
  )
}
