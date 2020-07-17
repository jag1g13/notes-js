import React from 'react'
import marked from 'marked'

import ProjectChartComponent from './ProjectChartComponent.js'
import DoughnutChartComponent from './DoughnutChartComponent.js'

/**
 * Component providing detail and list views of notes fetched from API.
 */
class NotesComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            notes: [],
            selected: 0
        }

        this.fetch_notes = this.fetch_notes.bind(this)
        this.select_note = this.select_note.bind(this)
    }

    componentDidMount() {
        this.fetch_notes()
    }

    fetch_notes() {
        fetch('/api/notes')
            .then(res => res.json())
            .then(res => this.setState({ notes: res }))
            .catch(exc => console.log(exc))
    }

    select_note(note_id) {
        this.setState({ selected: note_id })
    }

    render(props, state) {
        return (
            <div className="columns">
                <div className="column is-three-quarters">
                    <ProjectChartComponent />

                    <NoteDetailComponent notes={this.state.notes} selected={this.state.selected} />
                </div>

                <div className="column">
                    <NoteListComponent
                        notes={this.state.notes}
                        on_refresh={this.fetch_notes}
                        select_note={this.select_note}
                        selected_note={this.state.selected} />
                </div>
            </div>
        )
    }
}

/**
 * Component providing detail of a single note.
 */
function NoteDetailComponent(props) {
    if (props.selected < props.notes.length) {
        const content = marked(props.notes[props.selected].content)

        return (
            <div className="content" dangerouslySetInnerHTML={{
                __html: content
            }}></div>
        )
    }
    return <h1>No Content</h1>
}

/**
 * Component providing a list of note items.
 */
function NoteListComponent(props) {
    const list_items = props.notes.map((note, index) =>
        <NoteListItemComponent key={index} id={index} select_note={props.select_note} selected={index === props.selected_note} note={note} />
    )

    return (
        <div>
            <button className="button is-fullwidth is-primary" onClick={props.on_refresh}>Refresh</button>
            <ul>{list_items}</ul>
        </div>
    )
}

/**
 * Component providing brief overview of a note.
 */
function NoteListItemComponent(props) {
    function handle_click(event) {
        props.select_note(props.id)
    }

    return (
        <div className={'card mt-3' + (props.selected ? ' has-background-info' : '')} onClick={handle_click}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <h4 className="title is-4">
                            {props.note.title}
                        </h4>
                    </div>

                    <div className="media-left">
                        <figure className="image">
                        </figure>
                    </div>
                </div>

                <div className="content">
                    <DoughnutChartComponent data={props.note.metadata.projects} />
                </div>
            </div>
        </div>
    )
}

export { NotesComponent }
