const mongoose = require('mongoose')

const user = 'Abdulla'
const password = process.env.PASS

mongoose.connect(`mongodb+srv://${user}:${password}@tft-rbx8e.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser: true })

let ChampionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tier: Number,
    classes: Array,
    health: Array,
    attackSpeed: Number,
    damage: Array,
    range: Number,
    armor: Number,
    magicResist: Number,
    iconURL: String,
    shopIconUrl: String,
    ability: {
        iconURL: { type: String },
        name: { type: String },
        type: { type: Boolean },
        manaCost: { type: Number },
        manaStart: { type: Number },
        desc: { type: String }
    }
})

module.exports = mongoose.model('Champion', ChampionSchema)