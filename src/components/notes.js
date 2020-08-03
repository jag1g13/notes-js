import React from 'react'
import marked from 'marked'

import ProjectChartComponent from './ProjectChartComponent.js'

/**
 * Component providing detail and list views of notes fetched from API.
 */
export class NotesComponent extends React.Component {
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
            .then(notes => this.setState({ notes: notes }))
            .catch(exc => console.log(exc))
    }

    select_note(note_id) {
        this.setState({ selected: note_id })
    }

    render() {
        let projects = new Set()

        for (const note of this.state.notes) {
            for (const project in note.metadata.projects) {
                projects.add(project)
            }
        }

        projects = Array.from(projects).sort()

        const datasets = projects.map(project => ({
            label: project,
            data: this.state.notes.map(note => {
                return note.metadata.projects[project] || 0
            }),

            // Add border to selected column
            borderWidth: context => this.state.selected === context.dataIndex ? 8 : 0,
            borderSkipped: false,
            borderColor: 'rgba(0, 0, 0, 0.2)'

        }))

        return (
            <div className="columns">
                <div className="column is-three-quarters">
                    <ProjectChartComponent data={{
                        labels: this.state.notes.map(note => note.date),
                        datasets: datasets
                    }} select_note={this.select_note} />

                    <NoteDetailComponent note={this.state.notes[this.state.selected]} />
                </div>

                <div className="column is-one-quarter">
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
export function NoteDetailComponent(props) {
    if (props.note) {
        const content = marked(props.note.content)

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
export function NoteListComponent(props) {
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
export function NoteListItemComponent(props) {
    return (
        <div className={'card mt-3' + (props.selected ? ' has-background-info' : '')} onClick={() => props.select_note(props.id)}>
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
            </div>
        </div>
    )
}
