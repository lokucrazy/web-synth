import UID from './UID.js'
import { createModule } from '../../interface/Interface.js'

class Module extends HTMLElement {
  constructor(ctx, name, createNode) {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.ctx = ctx
    this.name = name
    this.id = UID(this.name)
    this.node = createNode(this.ctx)
    this.module = createModule(this.id, this.name)

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'style/module.css');
    this.shadow.appendChild(linkElem);
    this.shadow.appendChild(this.module)    
  }

  connect(index) {
    return {
      to: (dest) => {
        if (dest) {
          if (Number.isInteger(index) && this.node instanceof Array) {
            if (this.node[index]) {
              this.node[index].connect(dest)
            }
          } else if (typeof dest === 'function') {
            typeof index === 'string' ? this.node[index] = dest : this.node = dest
          } else if (this.node instanceof AudioNode && (dest instanceof AudioNode || dest instanceof  AudioParam)) {
            this.node.connect(dest)
          }
        }
      }
    }
  }
}

export default Module