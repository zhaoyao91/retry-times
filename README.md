# Retry Times

> Retry a task at most given times.

## Installation

```
npm i retry-times
```

## Usage

```ecmascript 6
const {retryTimes, withRetry} = require('retry-times')

// a task is any function without argument
const fetchDataTask = async () => {
  return await fetch(...)
}

const data = await retryTimes(fetchDataTask, {times: 3})

// or
const fetchWithRetry = withRetry({times: 3}, fetch)
const data = await fetchWithRetry(...).then(...).catch(...)
```

## API

### module.retryTimes

Retry a task at most given times.

`async func(task, options) => any`

- task: `async func() => any`
- options: `Object`
  - times: `Number`
  - onRetry?: `async func(err, alreadyRunCount)` - called before a retry
  
### module.withRetry

Retry a task at most given times.

`async func(options, fn) => async fnWithRetry`

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