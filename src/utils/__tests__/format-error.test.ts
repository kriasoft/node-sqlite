import { formatError } from '../format-error'

describe('format-error', () => {
  it('should return Error instance without modification', () => {
    const err = new Error('test')
    expect(formatError(err)).toEqual(err)
  })

  it('should convert objects to an Error instance', () => {
    const err = { custom: 'prop' }
    const newErr = formatError(err)
    expect(newErr['custom']).toEqual('prop')
  })

  it('should handle pure string errors', () => {
    const err = 'test'
    const newErr = formatError(err)
    expect(newErr.message).toEqual('test')
  })

  it('should return errors of an unknown type', () => {
    const err = 1234
    const newErr = formatError(err)
    expect(newErr.message).toEqual('1234')
  })
})
