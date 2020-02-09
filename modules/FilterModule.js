import { createInterface, createModule } from '../interface/Interface.js';

import Module from './Protoypes/Module.js'

function FilterModule(ctx, type) {
    if (!ctx || !type) return
    Module.call(this, ctx, 'Filter Module', (context) => context.createBiquadFilter())
    this.type = type
    this.node = this.ctx.createBiquadFilter()
    this.defaultTypes = [
        'lowpass',
        'highpass',
        'bandpass',
        'lowshelf',
        'highshelf',
        'peaking',
        'notch',
        'allpass',
    ]
    this.node.type = this.type

    this.setFrequency = (value) => {
        if (!value) return
        this.node.frequency.value = value
    }

    this.setQ = (value) => {
        if (!value) return
        this.node.Q.value = value
    }

    this.setGain = (value) => {
        if (!value) return
        this.node.gain.value = value
    }

    this.setType = (value) => {
        if (!value) return
        this.node.type = value
    }
}

FilterModule.prototype = Object.create(Module.prototype)

FilterModule.prototype.renderInterface = function() {
    const filterInterface = createInterface({
        dropDown: [
            this.node.type,
            this.defaultTypes,
            (value) => this.setType(value),
        ],
        sliders: [
            [
                'Freq',
                '16.35',
                '3951.07',
                this.node.frequency.value.toFixed(2).toString(),
                '1',
                (value) => this.setFrequency(value),
            ],
            [
                'Q',
                '0',
                '20',
                this.node.Q.value.toFixed(2).toString(),
                '1',
                (value) => this.setQ(value),
            ],
            [
                'Gain',
                '-10',
                '10',
                this.node.gain.value.toFixed(2).toString(),
                '1',
                (value) => this.setGain(value),
            ],
        ],
    })
    this.module.appendChild(filterInterface)
    return this.module
}

export default FilterModule