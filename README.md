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
const retry3Times = retryTimes({times: 3})
const data = await retry3Times(fetchDataTask)
```

## API

### module.retryTimes

Retry a task at most given times, or return a wrapper function.

```
func(options) => async func(task) => any
or
async func(options, task) => any
```

- options: `Object`
  - times: `Number`
  - onRetry?: `async func(err, alreadyRunCount)` - called before a retry
- task: `async func() => any`

  
### module.retry

Retry a task.

```
func(options) => async func(task) => any
or
async func(options, task) => any
```

- options: `Object`
  - shouldRetry: `async func(err) => Boolean`
  - onRetry?: `async func(err)` - called before a retry
- task: `async func() => any`
