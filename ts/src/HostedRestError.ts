
import { Context } from './Context'


class HostedRestError extends Error {

  isHostedRestError = true

  sdk = 'HostedRest'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  HostedRestError
}

