const express = require('express')
const app = express()
const port = process.env.PORT || 3001

let championRoute = require('./routes/champion')
let itemRoute = require('./routes/item')
let synergyRoute = require('./routes/synergy')

let bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})
app.use(championRoute)
app.use(itemRoute)
app.use(synergyRoute)
app.use(express.static('public'))

app.use((req,res,next) => {
    res.status(404).send('Are you lost?')
})

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('Ops you have crashed the system, good job')
})

app.listen(port, () => console.log(`app listening on port ${port}!`))