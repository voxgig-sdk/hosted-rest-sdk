
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HostedRestSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HostedRestSDK.test()
    equal(null !== testsdk, true)
  })

})
