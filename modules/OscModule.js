import { createInterface } from '../interface/Interface.js';

import Module from './Protoypes/Module.js'

function OscModule(ctx, amount, types) {
    if (ctx === undefined || amount === undefined || types === undefined) return
    if (types.length === 0 || !(types instanceof Array)) return
    Module.call(this, ctx, 'Osc Module', (context) => newOscillators(context, amount, types))
    this.amount = amount
    this.types = types.slice(0, amount).filter(type => type !== undefined)
    this.defaultTypes = ['sine', 'square', 'triangle']
    this.frequencies = this.node.map(osc => osc.frequency.value)
    this.modAmount = 0


    this.start = () => {
        this.node.forEach(osc => osc.start())
    }

    this.stop = (time = 0) => {
        this.node.forEach(osc => {
            osc.stop(time)
        })
        this.node = newOscillators(this.ctx, this.amount, this.types, this.frequencies)
        Array.from(this.module.children)
            .filter(child => child.className === 'param-interface')
            .forEach(param => this.module.removeChild(param))
        this.renderInterface()
    }

    this.modInputs = this.node.reduce((mod, osc, index) => {
        mod[`osc${index}`] = (value) => osc.frequency.setValueAtTime(osc.frequency.value + value, this.ctx.currentTime)
        return mod
    }, {})

    this.setFrequency = (osc, value) => {
        this.node[osc].frequency.value = value
        this.frequencies[osc] = value
    }

    this.setType = (osc, type) => {
        this.node[osc].type = type
        this.types[osc] = type
    }
}

OscModule.prototype = Object.create(Module.prototype)

OscModule.prototype.renderInterface = function() {
    this.node.map((osc, index) => {
        const oscInterface = createInterface({
            dropdown: [
                osc.type,
                this.defaultTypes,
                (value) => this.setType(index, value)
            ],
            sliders: [
                [
                    'Freq',
                    '16.35',
                    '3951.07',
                    osc.frequency.value.toFixed(2).toString(),
                    '1',
                    (value) => this.setFrequency(index, value)
                ],
            ],
        })
        this.module.appendChild(oscInterface)
    })
    return this.module
}

function newOscillators(ctx = undefined, amount = 0, types = [], frequencies = []) {
    if (!ctx || !amount || !types.length) return []
    const oscs = [];
    for (let i = 0; i < amount; i++) {
        oscs.push(ctx.createOscillator())
        oscs[i].type = types[i] ? types[i].toString() : 'sine'
        oscs[i].frequency.value = frequencies[i] || 440
    }
    return oscs
}

export default OscModule