const mongoose = require('mongoose')

const user = 'Abdulla'
const password = 'MFtwfwi8VFVXDLyh'

mongoose.connect(`mongodb+srv://${user}:${password}@tft-rbx8e.mongodb.net/test?retryWrites=true&w=majority`)

let ChampionSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    tier: Number,
    classes: Array
})

module.exports = mongoose.model('Champion', ChampionSchema)