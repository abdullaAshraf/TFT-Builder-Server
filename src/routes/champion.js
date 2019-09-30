const express = require('express')
const router = express.Router()
const ChampionModel = require('../models/champion.model')
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

//Get all champions
router.get('/champion', (req, res) => {
    ChampionModel.find()
        .then(doc => {
            res.json(doc)
        }).catch(err => {
            res.status(500).json(err)
        })
})

//Get champion by name
router.get('/champion/:name', (req, res) => {
    ChampionModel.findOne({
        name: req.params.name
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://`+ process.env.DOMAIN +`/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH,
    issuer: `https://`+ process.env.DOMAIN +`/`,
    algorithms: ['RS256']
});

//router.use(checkJwt);

//Create a new Champion
router.post('/champion', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missiing')
    }

    let model = new ChampionModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


//Update champion
router.put('/champion/:name', (req, res) => {
    ChampionModel.findOneAndUpdate({
        name: req.params.name
    }, req.body, { new: true })
        .then(doc => {
            res.json(doc)
        }).catch(err => {
            res.status(500).json(err)
        })
})

//Delete champion
router.delete('/champion/:name', (req, res) => {
    ChampionModel.findOneAndRemove({
        name: req.params.name
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router