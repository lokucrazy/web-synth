import Module from './Prototypes/Module.js'
import { createInterface } from '../interface/Interface.js';

class OscModule extends Module {
  constructor(ctx, amount, types) {
    super(ctx, 'Osc Module', (context) => newOscillators(context, amount, types))
    if (ctx === undefined || amount === undefined || types === undefined) return
    if (types.length === 0 || !(types instanceof Array)) return
    this.amount = amount
    this.types = types.slice(0, amount).filter(type => type !== undefined)
    this.defaultTypes = ['sine', 'square', 'triangle']
    this.frequencies = this.node.map(osc => osc.frequency.value)
    this.modAmount = 0
    this.modInputs = this.node.reduce((mod, osc, index) => {
      mod[`osc${index}`] = (value) => osc.frequency.setValueAtTime(osc.frequency.value + value, this.ctx.currentTime)
      return mod
    }, {})

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
        connections: [
          { tooltip: 'frequency input' },
          { tooltip: 'oscillator output', male: true },
        ],
      })
      this.module.appendChild(oscInterface)
    })
  }

  start() {
    this.node.forEach(osc => osc.start())
  }

  stop(time = 0) {
    this.node.forEach(osc => {
      osc.stop(time)
    })
    this.node = newOscillators(this.ctx, this.amount, this.types, this.frequencies)
  }

  setFrequency(osc, value) {
    this.node[osc].frequency.value = value
    this.frequencies[osc] = value
  }

  setType(osc, type) {
    this.node[osc].type = type
    this.types[osc] = type
  }
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