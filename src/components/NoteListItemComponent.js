import React from 'react'

/**
 * Component providing brief overview of a note.
 */
export default function NoteListItemComponent (props) {
  return (
    <div className={'card mt-3' + (props.selected ? ' has-background-info' : '')} onClick={() => props.select_note(props.id)}>
      <div className='card-content'>
        <div className='media'>
          <div className='media-content'>
            <h4 className='title is-4'>
              {props.note.title}
            </h4>
          </div>

          <div className='media-left'>
            <figure className='image' />
          </div>
        </div>
      </div>
    </div>
  )
}
