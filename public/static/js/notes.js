import * as Preact from 'https://unpkg.com/htm/preact/standalone.module.js'
import marked from 'https://unpkg.com/marked@1.1.0/lib/marked.esm.js'

import { ProjectChartComponent, DoughnutChartComponent } from './projects.js'

/**
 * Component providing detail and list views of notes fetched from API.
 */
class NotesComponent extends Preact.Component {
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
        return Preact.html`
            <div class="columns">
                <div class="column is-three-quarters">
                    <${ProjectChartComponent}/>

                    <${NoteDetailComponent} notes=${state.notes} selected=${state.selected}/>
                </div>

                <div class="column">
                    <${NoteListComponent}
                    notes=${state.notes}
                    on_refresh=${this.fetch_notes}
                    select_note=${this.select_note}
                    selected_note=${state.selected} />
                </div>
            </div>
        `
    }
}

/**
 * Component providing detail of a single note.
 */
function NoteDetailComponent(props) {
    if (props.selected < props.notes.length) {
        const content = props.notes[props.selected].content

        return Preact.html`
            <div class="content" dangerouslySetInnerHTML=${{
                __html: marked(props.notes[props.selected].content)
            }}></div>
        `
    }
    return Preact.html`<h1>No Content</h1>`
}

/**
 * Component providing a list of note items.
 */
function NoteListComponent(props) {
    return Preact.html`
        <button class="button is-fullwidth is-primary" onClick=${props.on_refresh}>Refresh</button>
        ${props.notes.map((note, index) => Preact.html`
                <${NoteListItemComponent} id=${index} select_note=${props.select_note} selected=${index === props.selected_note} ...${note}/>
        `)}
    `
}

/**
 * Component providing brief overview of a note.
 */
function NoteListItemComponent(props) {
    function handle_click(event) {
        props.select_note(props.id)
    }

    return Preact.html`
        <div class="${'card mt-3' + (props.selected ? ' has-background-info' : '')}" onclick=${handle_click}>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <h4 class="title is-4">
                            ${props.title}
                        </h4>
                    </div>

                    <div class="media-left">
                        <figure class="image">
                        </figure>
                    </div>
                </div>

                <div class="content">
                    <${DoughnutChartComponent}/>
                </div>
            </div>
        </div>
    `
}

export { NotesComponent }
