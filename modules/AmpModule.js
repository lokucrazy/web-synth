import { createModule, createInterface } from "../interface/Interface.js";

let ampNum = {
    val: 0,
    toString: function() {
        return (() => 'AmpModule' + this.val++)()
    }
}

function AmpModule(ctx) {
    if (!ctx) return
    this.id = ampNum.toString()
    this.ctx = ctx
    this.amp = this.ctx.createGain()

    this.setGain = (value) => {
        this.amp.gain.setValueAtTime(value, this.ctx.currentTime)
    }

    this.connect = () => {
        return {
            to: (dest) => {
                this.amp.connect(dest)
            }
        }
    }

    this.renderInterface = () => {
        const moduleInterface = createModule(this.id, 'Amp Module')
        const ampInterface = createInterface(
            undefined,
            [
                [
                    'Gain',
                    '0',
                    '1',
                    this.amp.gain.value.toFixed(2).toString(),
                    '0.01',
                    (value) => this.setGain(value)
                ]
            ]
        )
        moduleInterface.appendChild(ampInterface)
        return moduleInterface
    }
}

export default AmpModule
