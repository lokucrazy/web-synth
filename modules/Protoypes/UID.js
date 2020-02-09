const uids = {}

function UID(name) {
  let val = 0
  if (Number.isInteger(uids[name])) {
    val = ++uids[name]
  } else {
    val = 0
    uids[name] = val
  }

  return '' + name + val
}

export default UID