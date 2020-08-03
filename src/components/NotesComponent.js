import React from 'react'

import ProjectChartComponent from './ProjectChartComponent.js'
import NoteDetailComponent from './NoteDetailComponent.js'
import NoteListComponent from './NoteListComponent.js'

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
                        handleRefresh={this.fetch_notes}
                        select_note={this.select_note}
                        selected_note={this.state.selected} />
                </div>
            </div>
        )
    }
}
