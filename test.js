const {retryTimes, withRetry} = require('.')

describe('retryTimes', function () {
  it('should succeed directly', async function () {
    const func = testFunc(1)
    expect(await retryTimes(func, {times: 3})).toBe(1)
  })

  it('should succeed at second run', async function () {
    const func = testFunc(2)
    expect(await retryTimes(func, {times: 3})).toBe(2)
  })

  it('should failed', async function () {
    const func = testFunc(5)
    await expect(retryTimes(func, {times: 3})).rejects.toHaveProperty('message', 'failed at 3')
  })
  it('should report error and current run count', async function () {
    const func = testFunc(3)
    let run = 1
    await retryTimes(func, {
      times: 3,
      onRetry (err, runCount) {
        expect(err.message).toBe(`failed at ${run}`)
        expect(runCount).toBe(run)
        run++
      }
    })
  })
})

describe('Test withRetry', () => {
  it('should succeed directly', async function () {
    const funcWithRetry = withRetry({times: 3}, testFunc(1))
    expect(await funcWithRetry()).toBe(1)
  })

  it('should succeed at second run', async function () {
    const funcWithRetry = withRetry({times: 3}, testFunc(2))
    expect(await funcWithRetry()).toBe(2)
  })
  it('should failed', async function () {
    const funcWithRetry = withRetry({times: 3}, testFunc(5))
    await expect(funcWithRetry()).rejects.toHaveProperty('message', 'failed at 3')
  })
  it('should report error and current run count', async function () {
    let run = 1
    const funcWithRetry = withRetry({
      times: 3,
      onRetry (err, runCount) {
        expect(err.message).toBe(`failed at ${run}`)
        expect(runCount).toBe(run)
        run++
      }
    }, testFunc(3))
    await funcWithRetry()
  })
})

function testFunc (finishAt) {
  let runTimes = 0
  return function () {
    runTimes++
    if (runTimes >= finishAt) {
      return runTimes
    }
    else throw new Error(`failed at ${runTimes}`)
  }
}