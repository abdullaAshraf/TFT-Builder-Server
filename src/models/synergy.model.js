const mongoose = require('mongoose')

const user = 'Abdulla'
const password = 'MFtwfwi8VFVXDLyh'

mongoose.connect(`mongodb+srv://${user}:${password}@tft-rbx8e.mongodb.net/test?retryWrites=true&w=majority`)

let SynergySchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    iconURL: String,
    shopIconUrl: String,
    desc: String,
    stages: Array
})

module.exports = mongoose.model('Synergy', SynergySchema)