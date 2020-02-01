import FilterModule from "./modules/FilterModule.js";
import OscModule from "./modules/OscModule.js";

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

const oscModule = new OscModule(audioCtx, 2, ['square'])
const filterModule = new FilterModule(audioCtx, 'lowpass')
export function playOscModule() {
    oscModule.connect(0).to(filterModule.filter)
    oscModule.connect(1).to(filterModule.filter)
    filterModule.connect().to(audioCtx.destination)
    oscModule.start()
}

export function stopOscModule() {
    oscModule.stop(audioCtx.currentTime)
}

document.querySelector('#rack').appendChild(oscModule.renderInterface())
document.querySelector('#rack').appendChild(filterModule.renderInterface())
document.querySelector('#oscModuleButton').addEventListener('click', playOscModule)
document.querySelector('#StopModule').addEventListener('click', stopOscModule)