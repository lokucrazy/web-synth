import { createInterface, createModule } from "../interface/Interface.js";

let filterNum = {
    val: 0,
    toString: function() {
        return (() => 'FilterModule' + this.val++)()
    }
}

function FilterModule(ctx, type) {
    if (!ctx || !type) return
    this.id = filterNum.toString()
    this.ctx = ctx
    this.type = type
    this.filter = this.ctx.createBiquadFilter()
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
    this.filter.type = this.type

    this.setFrequency = (value) => {
        if (!value) return
        this.filter.frequency.value = value
    }

    this.setQ = (value) => {
        if (!value) return
        this.filter.Q.value = value
    }

    this.setGain = (value) => {
        if (!value) return
        this.filter.gain.value = value
    }

    this.setType = (value) => {
        if (!value) return
        this.filter.type = value
    }

    this.connect = () => {
        return {
            to: (dest) => {
                if (dest) {
                    this.filter.connect(dest)
                }
            }
        }
    }

    this.renderInterface = () => {
        const moduleInterface = createModule(this.id, 'Filter Module')
        const filterInterface = createInterface(
            [
                this.filter.type,
                this.defaultTypes,
                (value) => this.setType(value),
            ],
            [
                [
                    'Freq',
                    '16.35',
                    '3951.07',
                    this.filter.frequency.value.toFixed(2).toString(),
                    '1',
                    (value) => this.setFrequency(value),
                ],
                [
                    'Q',
                    '0',
                    '20',
                    this.filter.Q.value.toFixed(2).toString(),
                    '1',
                    (value) => this.setQ(value),
                ],
                [
                    'Gain',
                    '-10',
                    '10',
                    this.filter.gain.value.toFixed(2).toString(),
                    '1',
                    (value) => this.setGain(value),
                ],
            ]
        )
        moduleInterface.appendChild(filterInterface)
        return moduleInterface
    }
}

export default FilterModule