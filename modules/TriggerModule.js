import { createButton, createInterface } from '../interface/Interface.js';

import Module from './Prototypes/Module.js'

class TriggerModule extends Module {
  constructor() {
    super(null, 'Trigger Module', () => null)
    this.amount = 0

    const triggerInterface = createInterface({
      sliders: [
        [
          'Mod',
          '0',
          '100',
          this.amount.toString(),
          '1',
          (value) => this.amount = Number(value),
        ],
      ],
      connections: [
        { tooltip: 'trigger output', male: true },
      ],
    })
    const triggerButton = createButton('Trigger', {
      onPress: this.onPress,
      onRelease: this.onRelease,
    })
    triggerInterface.appendChild(triggerButton)
    this.module.appendChild(triggerInterface)
  }

  onPress() {
    this.node.forEach(n => n(this.amount))
  }

  onRelease() {
    this.node.forEach(n => n(0 - this.amount))
  }
}

export default TriggerModule