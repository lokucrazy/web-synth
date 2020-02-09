import { createInterface, createModule } from '../interface/Interface.js';

import Module from './Protoypes/Module.js'

function AmpModule(ctx) {
    if (!ctx) return
    Module.call(this, ctx, 'Amp Module', (context) => context.createGain())
    console.log(this.node)

    this.setGain = (value) => {
        this.node.gain.setValueAtTime(value, this.ctx.currentTime)
    }
}

AmpModule.prototype = Object.create(Module.prototype)

AmpModule.prototype.renderInterface = function() {
    const ampInterface = createInterface({
        sliders: [
            [
                'Gain',
                '0',
                '1',
                this.node.gain.value.toFixed(2).toString(),
                '0.01',
                (value) => this.setGain(value)
            ]
        ],
    })
    this.module.appendChild(ampInterface)
    return this.module
}

export default AmpModule
