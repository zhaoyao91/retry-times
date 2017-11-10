const retry = require('./retry')

async function retryTimes (task, options = {}) {
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

module.exports = retryTimes