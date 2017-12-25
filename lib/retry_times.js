const retry = require('./retry')

function retryTimes (options, task) {
  if (arguments.length === 1) return task => _retryTimes(options, task)
  else if (arguments.length === 2) return _retryTimes(options, task)
  else throw new TypeError('Invalid number of arguments.')
}

module.exports = retryTimes

function _retryTimes (options = {}, task) {
  const {
    times,
    onRetry, // func(err, alreadyRunCount)
  } = options

  let runCount = 1

  options = {
    onRetry: async (err) => {
      if (onRetry) await onRetry(err, runCount)
      runCount++
    },
    shouldRetry: (err) => runCount < times
  }

  return retry(options, task)
}