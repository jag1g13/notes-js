import React from 'react'
import 'bulma/css/bulma.css'

import icon_notebook from './img/icon-notebook.svg'
import icon_color_swatch from './img/icon-color-swatch.svg'

import { NotesComponent } from './components/notes.js'

/**
 * Entrypoint to Notes Tracker app.
 */
function App() {
    return (
        <div className="App">
            <nav className="navbar has-background-primary" role="navigation">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <img src={icon_notebook} alt='' />
                        Note Tracker
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="control has-icons-left">
                            <div className="select">
                                <select id="theme_select">
                                </select>
                            </div>

                            <div className="icon is-left">
                                <img src={icon_color_swatch} alt='' />
                            </div>
                        </div>
                    </div>
                </div>

            </nav>

            <section className="section">
                <div className="container">
                    <NotesComponent />
                </div>
            </section>
        </div>
    )
}

export default App
