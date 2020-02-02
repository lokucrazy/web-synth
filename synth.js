import FilterModule from "./modules/FilterModule.js";
import OscModule from "./modules/OscModule.js";
import AmpModule from "./modules/AmpModule.js";

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

const oscModule = new OscModule(audioCtx, 2, ['square'])
const filterModule = new FilterModule(audioCtx, 'lowpass')
const ampModule = new AmpModule(audioCtx)
ampModule.connect().to(audioCtx.destination)
export function playOscModule() {
    oscModule.connect(0).to(filterModule.filter)
    oscModule.connect(1).to(filterModule.filter)
    filterModule.connect().to(ampModule.amp)
    oscModule.start()
}

export function stopOscModule() {
    oscModule.stop(audioCtx.currentTime)
}

document.querySelector('#rack').appendChild(oscModule.renderInterface())
document.querySelector('#rack').appendChild(filterModule.renderInterface())
document.querySelector('#rack').appendChild(ampModule.renderInterface())
document.querySelector('#oscModuleButton').addEventListener('click', playOscModule)
document.querySelector('#StopModule').addEventListener('click', stopOscModule)