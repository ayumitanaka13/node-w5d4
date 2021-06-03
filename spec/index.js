require('dotenv').config()
const chai = require('chai')
const mongoose = require('mongoose')
global.expect = chai.expect
global.sinon = require('sinon')

before(function(){
    mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
})

after(function(){
    mongoose.connection.close()
})

afterEach(function(){
    sinon.restore()
})

require('./routes/sign-up.spec')