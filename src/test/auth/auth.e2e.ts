/**
 * AuthController E2E tests 
 */
describe('Auth', () => {

  /**
   * Singup Users (POST)
   */
  require('./describe/signup.describe')

  /**
   * Check Otp (POST)
   */
  require('./describe/check-otp.describe')

  /**
   * Login Users (POST)
   */
  require('./describe/login.describe')

})