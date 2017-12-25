const retryTimes = require('./retry_times')

const withRetry = (options, fn) =>
  async (...args) => await retryTimes(async () => await fn(...args), options)

module.exports = withRetry
