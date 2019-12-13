import OscModule from "./OscModule.js";

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

const oscModule = new OscModule(audioCtx, 1, ['square'])
export function playOscModule() {
    oscModule.connect(0).to(audioCtx.destination)
    oscModule.start()
}

export function stopOscModule() {
    oscModule.stop(audioCtx.currentTime)
}

document.querySelector('#rack').appendChild(oscModule.renderInterface())
document.querySelector('#oscModuleButton').addEventListener('click', playOscModule)
document.querySelector('#StopModule').addEventListener('click', stopOscModule)