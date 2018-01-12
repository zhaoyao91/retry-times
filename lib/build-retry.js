module.exports = function buildRetry (options) {
  const {times, onRetry} = typeof options === 'number' ? {times: options} : options
  return async function retry (task) {
    let runCount = 0
    while (true) {
      runCount++
      try {
        return task()
      }
      catch (err) {
        if (runCount < times) onRetry && await onRetry(err, runCount)
        else throw err
      }
    }
  }
}
