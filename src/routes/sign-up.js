const bcrypt = require('bcryptjs')
const User = require('../model/User')

module.exports = {
  method: 'GET',
  path: '/sign-up',
  handler: async ({ payload }, h) => {
    // return 'Hello World'
    const encryptedPassword = await bcrypt.hash(payload.password, 12)
    const user = await User.create({
      ...payload,
      encryptedPassword
    })
    return user
  },
  config: {
    state: {
      parse: false, // parse and store in request.state
      failAction: 'ignore', // may also be 'ignore' or 'log'
    },
  },
}

// router.get('/endpoint', (req,res,next) => { return console.log('this is a controller')})
