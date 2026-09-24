
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HostedRestSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HostedRestSDK.test()
    equal(testsdk instanceof HostedRestSDK, true,
      'HostedRestSDK.test() must return a client synchronously')
  })

})
