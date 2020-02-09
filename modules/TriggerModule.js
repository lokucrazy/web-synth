import { createButton, createInterface, createModule } from "../interface/Interface.js";

let triggerNum = {
    val: 0,
    toString: function() {
        return (() => 'TriggerModule' + this.val++)()
    }
}


function TriggerModule() {
    this.id = triggerNum.toString()
    this.mod = null
    this.amount = 0

    this.onPress = () => {
        this.mod(this.amount)
    }

    this.onRelease = () => {
        this.mod(0 - this.amount)
    }

    this.connect = () => {
        return {
            to: (dest) => {
                this.mod = dest
            }
        }
    }

    this.renderInterface = () => {
        const moduleInterface = createModule(this.id, 'Trigger Module')
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
        moduleInterface.appendChild(triggerInterface)

        return moduleInterface;
    }
}

export default TriggerModule