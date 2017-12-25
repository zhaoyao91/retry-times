function retry (options, task) {
  if (arguments.length === 1) return task => _retry(options, task)
  else if (arguments.length === 2) return _retry(options, task)
  else throw new TypeError('Invalid number of arguments.')
}

async function _retry (options = {}, task) {
  const {
    shouldRetry,
    onRetry,
  } = options

  while (true) {
    try {
      return await task()
    }
    catch (err) {
      if (await shouldRetry(err)) {
        if (onRetry) await onRetry(err)
      }
      else {
        throw err
      }
    }
  }
}

module.exports = retry