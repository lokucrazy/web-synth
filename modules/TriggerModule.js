import { createButton, createInterface } from '../interface/Interface.js';

import Module from './Protoypes/Module.js'


function TriggerModule() {
    Module.call(this, null, 'Trigger Module', () => null)
    this.amount = 0

    this.onPress = () => {
        this.node.forEach(n => n(this.amount))
    }

    this.onRelease = () => {
        this.node.forEach(n => n(0 - this.amount))
    }
}

TriggerModule.prototype = Object.create(Module.prototype)

TriggerModule.prototype.renderInterface = function() {
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
        ]
    })
    const triggerButton = createButton('Trigger', {
        onPress: this.onPress,
        onRelease: this.onRelease,
    })
    triggerInterface.appendChild(triggerButton)
    this.module.appendChild(triggerInterface)

    return this.module;
}

export default TriggerModule