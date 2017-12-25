const retry = require('./retry')

function retryTimes (options = {}, fn) {
  if (arguments.length === 1) {
    return f => async (...args) => await _retryTimes(options, async () => await f(...args))
  } else if (arguments.length === 2) {
    return _retryTimes(options, fn)
  } else {
    throw new Error('arguments length is invalid!!')
  }
}

module.exports = retryTimes

async function _retryTimes (options = {}, task) {
  const {
    times,
    onRetry, // func(err, alreadyRunCount)
  } = options

  let runCount = 1

  return await retry(task, {
    onRetry: async (err) => {
      if (onRetry) await onRetry(err, runCount)
      runCount++
    },
    shouldRetry: (err) => runCount < times
  })
}