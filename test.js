const {retryTimes} = require('.')

describe('retryTimes', function () {
  it('should succeed directly', async function () {
    const func = testFunc(1)
    expect(await retryTimes({times: 3}, func)).toBe(1)
  })
  it('should succeed directly (as high order function)', async function () {
    const func = testFunc(1)
    expect(await retryTimes({times: 3})(func)).toBe(1)
  })
  it('should succeed at second run', async function () {
    const func = testFunc(2)
    expect(await retryTimes({times: 3}, func)).toBe(2)
  })

  it('should failed', async function () {
    const func = testFunc(5)
    await expect(retryTimes({times: 3}, func)).rejects.toHaveProperty('message', 'failed at 3')
  })
  it('should report error and current run count', async function () {
    const func = testFunc(3)
    let run = 1
    await retryTimes({
      times: 3,
      onRetry (err, runCount) {
        expect(err.message).toBe(`failed at ${run}`)
        expect(runCount).toBe(run)
        run++
      }
    }, func)
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