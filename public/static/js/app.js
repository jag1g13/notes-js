import * as Preact from 'https://unpkg.com/htm/preact/standalone.module.js'
import { NotesComponent } from './notes.js'

/**
 * Entrypoint to Notes Tracker app.
 */
class App extends Preact.Component {
    render() {
        return Preact.html`<${NotesComponent}/>`
    }
}

Preact.render(Preact.html`<${App}/>`, document.querySelector("#app"))
