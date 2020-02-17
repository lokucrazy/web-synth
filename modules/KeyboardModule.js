import { createButton, createConnection, createInterface } from '../interface/Interface.js'

import Module from './Prototypes/Module.js'
import { relativeNotes } from "../notes.js"

class KeyboardModule extends Module {
    constructor() {
        super(null, 'Keyboard Module', () => { return {'pitch': () => {}, 'gate': () => {} }})
        this.octave = 4
        this.notes = {}
        Object.keys(relativeNotes).forEach(key => {
            this.notes[key] = relativeNotes[key].map((note) => {
                return {
                    name: key,
                    onPress: () => {
                        this.node['pitch'](note)
                        this.node['gate'](0.5)
                    },
                    onRelease: () => {
                        this.node['pitch'](0 - note)
                        this.node['gate'](-0.5)
                    },
                }
            })
        })

        const keyboardInterface = createInterface()
        const octaveInterface = document.createElement('div')
        Object.keys(this.notes)
            .forEach(key => keyboardInterface.appendChild(createButton(this.notes[key][this.octave].name, {
                onPress: this.notes[key][this.octave].onPress,
                onRelease: this.notes[key][this.octave].onRelease
            })))
        keyboardInterface.appendChild(document.createElement('br'))
        octaveInterface.innerText = `${this.octave - 4}`
        keyboardInterface.appendChild(octaveInterface)
        keyboardInterface.appendChild(createConnection('keyboard output'))
        this.module.appendChild(keyboardInterface)
    }
}

export default KeyboardModule