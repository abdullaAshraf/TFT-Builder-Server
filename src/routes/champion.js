const express = require('express')
const router = express.Router()
const ChampionModel = require('../models/champion.model')

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

//Get champion by name
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