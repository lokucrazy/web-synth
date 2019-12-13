let oscNum = {
    val: 0,
    toString: function() {
        return (() => 'OscModule' + this.val++)()
    }
}

function OscModule(ctx, amount, types) {
    if (ctx === undefined || amount === undefined || types === undefined) {
        return
    }
    if (types.length === 0 || !(types instanceof Array)) {
        return
    }
    this.id = oscNum.toString()
    this.ctx = ctx
    this.amount = amount
    this.types = types.slice(0, amount).filter(type => type !== undefined)
    this.defaultTypes = ['sine', 'square', 'triangle']
    this.oscs = newOscillators(this.ctx, this.amount, this.types)
    this.frequencies = this.oscs.map(osc => osc.frequency.value)


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

    this.setFrequency = (osc, value) => {
        this.oscs[osc].frequency.value = value
        this.frequencies[osc] = value
    }

    this.setType = (osc, type) => {
        this.oscs[osc].type = type
        this.types[osc] = type
    }

    this.renderInterface = () => {
        const moduleInterface = document.createElement('div')
        moduleInterface.setAttribute('id', this.id)
        moduleInterface.setAttribute('class', 'osc-module')
        const moduleHeader = document.createElement('h3')
        moduleHeader.innerText = 'Oscillator Module'
        moduleInterface.appendChild(moduleHeader)
        moduleInterface.appendChild(document.createElement('br'))
        this.oscs.map((osc, index) => {
            const oscInterface = document.createElement('div')
            oscInterface.setAttribute('class','osc-interface')
            const slider = document.createElement('input')
            slider.setAttribute('class', 'vertical-slider')
            slider.setAttribute('type', 'range')
            slider.setAttribute('min', '16.35')
            slider.setAttribute('max', '3951.07')
            slider.setAttribute('value', osc.frequency.value.toString())
            slider.setAttribute('step', '1')
            slider.addEventListener('input', (event) => {
                if (event && event.target && event.target.value) {
                    this.setFrequency(index, event.target.value)
                }
            })
            const dropDown = document.createElement('select')
            dropDown.addEventListener('change', event => {
                if (event && event.target && event.target.value) {
                    this.setType(index, event.target.value)
                }
            })
            this.defaultTypes.forEach(type => {
                const option = document.createElement('option')
                option.setAttribute('value', type)
                option.innerText = type
                if (osc.type === type) {
                    option.setAttribute('selected', 'true')
                }
                dropDown.appendChild(option)
            })
            oscInterface.appendChild(slider)
            oscInterface.appendChild(dropDown)
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