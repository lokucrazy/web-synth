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
        const moduleInterface = document.createElement('div')
        moduleInterface.setAttribute('id', this.id)
        moduleInterface.setAttribute('class', 'filter-module')
        const moduleHeader = document.createElement('h3')
        moduleHeader.innerText = 'Filter Module'
        moduleInterface.appendChild(moduleHeader)
        moduleInterface.appendChild(document.createElement('br'))
        const filterInterface = document.createElement('div')
        filterInterface.setAttribute('class','param-interface')
        const freqSlider = document.createElement('input')
        freqSlider.setAttribute('class', 'vertical-slider')
        freqSlider.setAttribute('type', 'range')
        freqSlider.setAttribute('min', '16.35')
        freqSlider.setAttribute('max', '3951.07')
        freqSlider.setAttribute('value', this.filter.frequency.value.toString())
        freqSlider.setAttribute('step', '1')
        freqSlider.addEventListener('input', (event) => {
            if (event && event.target && event.target.value) {
                this.setFrequency(event.target.value)
            }
        })
        const qSlider = document.createElement('input')
        qSlider.setAttribute('class', 'vertical-slider')
        qSlider.setAttribute('type', 'range')
        qSlider.setAttribute('min', '16.35')
        qSlider.setAttribute('max', '3951.07')
        qSlider.setAttribute('value', this.filter.frequency.value.toString())
        qSlider.setAttribute('step', '1')
        qSlider.addEventListener('input', (event) => {
            if (event && event.target && event.target.value) {
                this.setQ(event.target.value)
            }
        })
        const gainSlider = document.createElement('input')
        gainSlider.setAttribute('class', 'vertical-slider')
        gainSlider.setAttribute('type', 'range')
        gainSlider.setAttribute('min', '16.35')
        gainSlider.setAttribute('max', '3951.07')
        gainSlider.setAttribute('value', this.filter.frequency.value.toString())
        gainSlider.setAttribute('step', '1')
        gainSlider.addEventListener('input', (event) => {
            if (event && event.target && event.target.value) {
                this.setGain(event.target.value)
            }
        })
        const dropDown = document.createElement('select')
        dropDown.addEventListener('change', event => {
            if (event && event.target && event.target.value) {
                this.setType(event.target.value)
            }
        })
        this.defaultTypes.forEach((type) => {
            const option = document.createElement('option')
            option.setAttribute('value', type)
            option.innerText = type
            if (this.filter.type === type) {
                option.setAttribute('selected', 'true')
            }
            dropDown.appendChild(option)
        })
        filterInterface.appendChild(freqSlider)
        filterInterface.appendChild(qSlider)
        filterInterface.appendChild(gainSlider)
        filterInterface.appendChild(dropDown)
        moduleInterface.appendChild(filterInterface)
        return moduleInterface
    }
}

export default FilterModule