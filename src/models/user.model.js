const mongoose = require('mongoose')

const user = 'Abdulla'
const password = process.env.PASS

mongoose.connect(`mongodb+srv://${user}:${password}@tft-rbx8e.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser: true })

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: String
})

module.exports = mongoose.model('User', UserSchema)