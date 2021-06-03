const mongoose = require('mongoose')

const connect = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    return connection
}

module.exports = {connect, mongoose}