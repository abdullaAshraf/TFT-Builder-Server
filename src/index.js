const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const championRoute = require('./routes/champion')
const itemRoute = require('./routes/item')
const synergyRoute = require('./routes/synergy')
const buildRoute = require('./routes/build')

const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet');

//app.use(helmet());
app.use(bodyParser.json())
app.use(cors())

app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})
app.use(championRoute)
app.use(itemRoute)
app.use(synergyRoute)
app.use(buildRoute)
app.use(express.static('public'))

app.use((req,res,next) => {
    res.status(404).send('Are you lost?')
})

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('Ops you have crashed the system, good job')
})

app.listen(port, () => console.log(`app listening on port ${port}!`))