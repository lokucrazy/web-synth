import { createInterface, createModule } from '../../interface/Interface.js'

import UID from './UID.js'

function Module(ctx, name, createNode) {
  this.ctx = ctx
  this.name = name
  this.id = UID(this.name)
  this.node = createNode(this.ctx)

  this.module = createModule(this.id, this.name)
}

Module.prototype.connect = function(index) {
  return {
    to: (dest) => {
      if (dest) {
        if (Number.isInteger(index) && this.node instanceof Array) {
          if (this.node[index]) {
            this.node[index].connect(dest)
          }
        } else {
          this.node.connect(dest)
        }
      }
    }
  }
}

Module.prototype.renderInterface = function() {
  return this.module
}

export default Module