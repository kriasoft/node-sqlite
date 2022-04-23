export function formatError (err: any) {
  if (err instanceof Error) {
    return err
  }

  if (typeof err === 'object') {
    const newError = new Error()

    for (let prop in err) {
      newError[prop] = err[prop]
    }

    // message isn't part of the enumerable set
    if (err.message) {
      newError.message = err.message
    }

    return newError
  }

  if (typeof err === 'string') {
    return new Error(err)
  }

  return new Error(err)
}
