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

const data = await retryTimes(fetchDataTask, {times: 3})
```

## API

### module.retryTimes

Retry a task at most given times.

`async func(task, options) => any`

- task: `async func() => any`
- options: `Object`
  - times: `Number`
  - onRetry?: `async func(err, alreadyRunCount)` - called before a retry
  
### module.retry

Retry a task.

`async func(task, options) => any`

- task: `async func() => any`
- options: `Object`
  - shouldRetry: `async func(err) => Boolean`
  - onRetry?: `async func(err)` - called before a retry