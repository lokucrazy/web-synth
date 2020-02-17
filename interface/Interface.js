export const createModule = (id = '', title= '') => {
    const module = document.createElement('div')
    module.setAttribute('id', id)
    const header = document.createElement('h3')
    header.innerText = title
    module.appendChild(header)
    return module
}

export const createInterface = ({ dropdown = [], sliders = [], connections = [] } = {}) => {
    const paramInterface = document.createElement('div')
    paramInterface.setAttribute('class', 'param-interface')
    if (dropdown && dropdown.length !== 0) {
        paramInterface.appendChild(createDropdown(...dropdown))
    } else {
        const emptyOptions = document.createElement('div')
        emptyOptions.setAttribute('class', 'options-select')
        paramInterface.appendChild(emptyOptions)
    }
    if (sliders && sliders.length !== 0) {
        sliders.forEach((slider = []) => paramInterface.appendChild(createSlider(...slider)))
    }
    if (connections.length) {
        const jacks = document.createElement('div')
        jacks.setAttribute('class', 'connections')
        connections.forEach(out => {
            const { tooltip, male } = out;
            const circle = createConnection(tooltip, male)
            jacks.appendChild(circle)
        })
        paramInterface.appendChild(jacks)
    }
    return paramInterface
};

export const createSlider = (name = '', min = '0', max = '100', value = '50', step = '1', onChange = () => {}) => {
    const div = document.createElement('div')
    const label = document.createElement('label')
    const slider = document.createElement('input')
    div.setAttribute('class', 'slider-container')
    label.setAttribute('class', 'slider-label')
    updateLabel(label, name, value)
    slider.setAttribute('class', 'vertical-slider')
    slider.setAttribute('orient', 'vertical')
    slider.setAttribute('type', 'range')
    slider.setAttribute('min', min)
    slider.setAttribute('max', max)
    slider.setAttribute('value', value)
    slider.setAttribute('step', step)
    slider.addEventListener('input', (event) => {
        if (event && event.target && event.target.value) {
            onChange(event.target.value)
            updateLabel(label, name, event.target.value)
        }
    })
    div.appendChild(slider)
    div.appendChild(label)
    return div
}

export const createDropdown = (initial = '', options = [], onSelect = () => {}) => {
    const div = document.createElement('div')
    const dropDown = document.createElement('select')
    div.setAttribute('class', 'options-select')
    dropDown.addEventListener('change', (event) => {
        if (event && event.target && event.target.value) {
            onSelect(event.target.value)
        }
    })
    options.forEach((type = '') => {
        const option = document.createElement('option')
        option.setAttribute('value', type)
        option.innerText = type
        if (initial === type) {
            option.setAttribute('selected', 'true')
        }
        dropDown.appendChild(option)
    })
    div.appendChild(dropDown)
    return div
}

export const createButton = (name = '', { onPress, onRelease, onClick }) => {
    const button = document.createElement('button')
    button.innerText = name
    if (onPress && onRelease) {
        button.addEventListener('mousedown', onPress)
        button.addEventListener('mouseup', onRelease)
        return button
    } else if (onClick) {
        button.addEventListener('click', onClick)
        return button
    }
    return button
}

export const createConnection = (tooltip = '', male = false) => {
    const className = male ? 'connections-male' : 'connections-female'
    const opposite = male ? 'connections-female' : 'connections-male'
    const outerDiv = document.createElement('div')
    const div = document.createElement('div')
    outerDiv.setAttribute('class', 'connections-outer')
    div.setAttribute('class', className)
    div.setAttribute('title', tooltip)
    div.setAttribute('draggable', 'true')
    outerDiv.appendChild(div)

    div.addEventListener('dragstart', (event) => {
        fetchConnections(opposite).forEach(connector => {
            connector.classList.add('connections-selectable')
        })
    })

    div.addEventListener('dragend', (event) => {
        console.log(fetchConnections(opposite))
        fetchConnections(opposite).forEach(connector => {
            connector.classList.remove('connections-selectable')
        })
    })

    return outerDiv
}

const updateLabel = (label = null, name = '', value = '') => {
    if (label) {
        label.innerText = `${name}: ${value}`
    }
}

const fetchConnections = (opposite) => (
    Array.from(document.querySelectorAll('[id*="Module"]'))
        .map(dom => dom.shadowRoot)
        .filter(Boolean)
        .map(root => Array.from(root.querySelectorAll(`div[class^="${opposite}"]`)))
        .filter(list => !!list.length)
        .reduce((nodes, li) => [...nodes, ...li], [])
)