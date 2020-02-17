import Module from './Prototypes/Module.js'
import { createInterface } from '../interface/Interface.js';

class FilterModule extends Module {
  constructor(ctx, type) {
    super(ctx, 'Filter Module', (context) => context.createBiquadFilter())
    if (!ctx || !type) return
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

    this.modInputs = {
      freqMod: (value) => this.node.frequency.setValueAtTime(this.node.frequency.value + value, this.ctx.currentTime),
      qMod: (value) => this.node.Q.setValueAtTime(this.node.Q.value + value, this.ctx.currentTime),
      gainMod: (value) => this.node.gain.setValueAtTime(this.node.gain.value + value, this.ctx.currentTime),
    }
        
    const filterInterface = createInterface({
      dropdown: [
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
      connections: [
        { tooltip: 'frequency input' },
        { tooltip: 'q input' },
        { tooltip: 'gain input' },
        { tooltip: 'filter output', male: true },
      ],
    })
    this.module.appendChild(filterInterface)
  }

  setFrequency(value) {
    if (!value) return
    this.node.frequency.value = value
  }

  setQ(value) {
    if (!value) return
    this.node.Q.value = value
  }

  setGain(value) {
    if (!value) return
    this.node.gain.value = value
  }

  setType(value) {
    if (!value) return
    this.node.type = value
  }
}

export default FilterModule