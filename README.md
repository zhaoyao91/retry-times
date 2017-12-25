# Retry Times

> Retry a task at most given times.

## Installation

```
npm i retry-times
```

## Usage

```ecmascript 6
const {retryTimes} = require('retry-times')

// a task is any function without argument
const fetchDataTask = async () => {
  return await fetch(...)
}

const data = await retryTimes({times: 3}, fetchDataTask)

// or
const fetchWithRetry = retryTimes({times: 3})(fetch)
const data = await fetchWithRetry(...).then(...).catch(...)
```

## API

### module.retryTimes

Retry a task at most given times, or return a wrapper function.

`async func(options, task) => any`

- options: `Object`
  - times: `Number`
  - onRetry?: `async func(err, alreadyRunCount)` - called before a retry
- task: `async func() => any`


`async func(options) => fn => fnWithRetry`

- options: `Object`
  - times: `Number`
  - onRetry?: `async func(err, alreadyRunCount)` - called before a retry
- fn: `async func(...args) => any`

  
### module.retry

Retry a task.

`async func(task, options) => any`

- task: `async func() => any`
- options: `Object`
  - shouldRetry: `async func(err) => Boolean`
  - onRetry?: `async func(err)` - called before a retry