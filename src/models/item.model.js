const mongoose = require('mongoose')

const user = 'Abdulla'
const password = process.env.PASS

mongoose.connect(`mongodb+srv://${user}:${password}@tft-rbx8e.mongodb.net/test?retryWrites=true&w=majority`)

let ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    iconURL: String,
    desc: String,
    subitems: Array
})

module.exports = mongoose.model('Item', ItemSchema)