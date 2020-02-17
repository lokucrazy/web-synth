import Module from './Prototypes/Module.js'
import { createInterface } from '../interface/Interface.js';

class AmpModule extends Module {
    constructor(ctx) {
        super(ctx, 'Amp Module', (context) => context.createGain())
        if (!ctx) return
        this.node.gain.setValueAtTime(0.00, this.ctx.currentTime)
        this.modInputs = {
            gainMod: (value) => this.node.gain.setValueAtTime(this.node.gain.value + value, this.ctx.currentTime),
        }

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
            connections: [
                { tooltip: 'amp input', male: false },
                { tooltip: 'amp output', male: true },
            ],
        })
        this.module.appendChild(ampInterface)
    }
    
    setGain(value) {
        this.node.gain.setValueAtTime(value, this.ctx.currentTime)
    }
}

export default AmpModule
