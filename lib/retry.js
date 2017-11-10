async function retry (task, options = {}) {
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