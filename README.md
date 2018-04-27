# Retry Times

> Retry a task at most given times.

## Deprecation

**This package is deprecated to prefer the new [retry-func](https://github.com/zhaoyao91/retry-func) package.**

## Installation

```
npm i retry-times --save
```

## Usage

### Retry a task directly

```ecmascript 6
const {buildRetry} = require('retry-times')

// a task is any function without argument
const task = async () => {
  ...
}

const retry = buildRetry(3) // or buildRetry({times: 3})
const data = await retry(task)
```

### Wrap a task with retry

```ecmascript 6
const {buildWithRetry} = require('retry-times')

// a task is any function without argument
const task = async () => {
  ...
}

const withRetry = buildWithRetry(3) // or buildWithRetry({times: 3})
const taskWithRetry = withRetry(task)
const data = taskWithRetry()
```


## API

### buildRetry

`buildRetry(options) => retry(task) => Promise`

### buildWithRetry

`buildWithRetry(options) => withRetry(task) => wrappedTask() => Promise`

### options

- times - the task will run at most times
- onRetry - `onRetry(err, runCount)`, callback when the task is about to retry 

The relations of run, onRetry, and runCount are as below:

```
run           ->             run           ->             run...
    onRetry(err, runCount=1)     onRetry(err, runCount=2)
```

## License

MIT
