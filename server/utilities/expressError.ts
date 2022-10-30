class ExpressError extends Error {
  status = 400
  constructor (message: string, status: number = 400) {
    super()
    this.message = message
    this.status = status
  }
}

export default ExpressError
