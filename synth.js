import AmpModule from "./modules/AmpModule.js";
import FilterModule from "./modules/FilterModule.js";
import OscModule from "./modules/OscModule.js";
import TriggerModule from "./modules/TriggerModule.js";

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

const oscModule = new OscModule(audioCtx, 2, ['square'])
const filterModule = new FilterModule(audioCtx, 'lowpass')
const ampModule = new AmpModule(audioCtx)
ampModule.connect().to(audioCtx.destination)
const triggerModule = new TriggerModule()
triggerModule.connect().to(oscModule.modInputs[0])
export function playOscModule() {
    oscModule.connect(0).to(filterModule.node)
    filterModule.connect().to(ampModule.node)
    oscModule.start()
}

export function stopOscModule() {
    oscModule.stop(audioCtx.currentTime)
}

document.querySelector('#rack').appendChild(oscModule.renderInterface())
document.querySelector('#rack').appendChild(filterModule.renderInterface())
document.querySelector('#rack').appendChild(ampModule.renderInterface())
document.querySelector('#rack').appendChild(triggerModule.renderInterface())
document.querySelector('#oscModuleButton').addEventListener('click', playOscModule)
document.querySelector('#StopModule').addEventListener('click', stopOscModule)