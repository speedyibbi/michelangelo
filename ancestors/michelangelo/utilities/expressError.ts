/**
 * extends Error class for custom errors
*/
class ExpressError extends Error {
  status = 400;
  /**
   * @param {string} message
   * @param {number} status
   * @return {void}
   */
  constructor(message: string, status: number = 400) {
    super();
    this.message = message;
    this.status = status;
  }
}

export default ExpressError;
