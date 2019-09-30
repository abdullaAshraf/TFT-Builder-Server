const mongoose = require('mongoose')

const user = 'Abdulla'
const password = process.env.PASS

mongoose.connect(`mongodb+srv://${user}:${password}@tft-rbx8e.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser: true })

let BuildSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    owner: String,
    desc: String,
    champions: Array,
    votes : Number
})

module.exports = mongoose.model('Build', BuildSchema)