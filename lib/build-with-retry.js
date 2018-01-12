const buildRetry = require('./build-retry')

module.exports = function buildWithRetry (options) {
  const retry = buildRetry(options)
  return function withRetry (task) {
    return () => retry(task)
  }
}