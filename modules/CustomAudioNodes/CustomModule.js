function CustomModule(ctx) {
  AudioNode.call(this, ctx)

  console.log(this.context)
}