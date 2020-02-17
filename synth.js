import AmpModule from './modules/AmpModule.js';
import FilterModule from './modules/FilterModule.js';
import KeyboardModule from './modules/KeyboardModule.js';
import OscModule from './modules/OscModule.js';
import TriggerModule from './modules/TriggerModule.js';

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

customElements.define('osc-module', OscModule)
customElements.define('filter-module', FilterModule)
customElements.define('amp-module', AmpModule)
customElements.define('trigger-module', TriggerModule)
customElements.define('keyboard-module', KeyboardModule)

const oscModule = new OscModule(audioCtx, 2, ['square'])
const filterModule = new FilterModule(audioCtx, 'lowpass')
const ampModule = new AmpModule(audioCtx)
ampModule.connect().to(audioCtx.destination)
const triggerModule = new TriggerModule()
triggerModule.connect().to(oscModule.modInputs['osc0'])
const keyboardModule = new KeyboardModule()
keyboardModule.connect('pitch').to(oscModule.modInputs['osc0'])
keyboardModule.connect('gate').to(ampModule.modInputs['gainMod'])
export function playOscModule() {
  oscModule.connect(0).to(filterModule.node)
  filterModule.connect().to(ampModule.node)
  oscModule.start()
}

export function stopOscModule() {
  oscModule.stop(audioCtx.currentTime)
}

document.querySelector('#rack').appendChild(oscModule)
document.querySelector('#rack').appendChild(filterModule)
document.querySelector('#rack').appendChild(ampModule)
document.querySelector('#rack').appendChild(triggerModule)
document.querySelector('#rack').appendChild(keyboardModule)
document.querySelector('#oscModuleButton').addEventListener('click', playOscModule)
document.querySelector('#StopModule').addEventListener('click', stopOscModule)