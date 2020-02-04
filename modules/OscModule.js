import { createInterface, createModule } from "../interface/Interface.js";

let oscNum = {
    val: 0,
    toString: function() {
        return (() => 'OscModule' + this.val++)()
    }
}

function OscModule(ctx, amount, types) {
    if (ctx === undefined || amount === undefined || types === undefined) return
    if (types.length === 0 || !(types instanceof Array)) return
    this.id = oscNum.toString()
    this.ctx = ctx
    this.amount = amount
    this.types = types.slice(0, amount).filter(type => type !== undefined)
    this.defaultTypes = ['sine', 'square', 'triangle']
    this.oscs = newOscillators(this.ctx, this.amount, this.types)
    this.frequencies = this.oscs.map(osc => osc.frequency.value)
    this.modAmount = 0


    this.start = () => {
        this.oscs.forEach(osc => osc.start())
    }

    this.stop = (time = 0) => {
        this.oscs.forEach(osc => {
            osc.stop(time)
        })
        this.oscs = newOscillators(this.ctx, this.amount, this.types, this.frequencies)
        document.getElementById(this.id).replaceWith(this.renderInterface())
    }

    this.connect = (osc) => {
        return {
            to: (dest) => {
                if (osc !== undefined && dest && this.oscs[osc] !== undefined) {
                    this.oscs[osc].connect(dest)
                }
            }
        }
    }

    this.modInputs = this.oscs.map((osc) => {
        return (value) => osc.frequency.value += (value)
    })

    this.setFrequency = (osc, value) => {
        this.oscs[osc].frequency.value = value
        this.frequencies[osc] = value
    }

    this.setType = (osc, type) => {
        this.oscs[osc].type = type
        this.types[osc] = type
    }

    this.renderInterface = () => {
        const moduleInterface = createModule(this.id, 'Oscillator Module')
        this.oscs.map((osc, index) => {
            const oscInterface = createInterface(
                [
                    osc.type,
                    this.defaultTypes,
                    (value) => this.setType(index, value)
                ],
                [
                    [
                        'Freq',
                        '16.35',
                        '3951.07',
                        osc.frequency.value.toFixed(2).toString(),
                        '1',
                        (value) => this.setFrequency(index, value)
                    ],
                ]
            )
            moduleInterface.appendChild(oscInterface)
        })
        return moduleInterface
    }
}

function newOscillators(ctx = undefined, amount = 0, types = [], frequencies = []) {
    if (!ctx || !amount || !types) return []
    const oscs = [];
    for (let i = 0; i < amount; i++) {
        oscs.push(ctx.createOscillator())
        if (types[i] !== undefined) {
            oscs[i].type = types[i].toString()
        } else {
            oscs[i].type = 'sine'
        }
        oscs[i].frequency.value = frequencies[i] ? frequencies[i] : 440
    }
    return oscs
}

export default OscModule