const express = require('express')
const router = express.Router()
const SynergyModel = require('../models/synergy.model')

//Create a new Synergy
router.post('/synergy', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missiing')
    }

    let model = new SynergyModel(req.body)
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

//Get all synergies
router.get('/synergy', (req, res) => {
    SynergyModel.find()
        .then(doc => {
            res.json(doc)
        }).catch(err => {
            res.status(500).json(err)
        })
})

//Get synergy by name
router.get('/synergy/:name', (req, res) => {
    SynergyModel.findOne({
        name: req.params.name
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Update synergy
router.put('/synergy/:name', (req, res) => {
    SynergyModel.findOneAndUpdate({
        name: req.params.name
    }, req.body, { new: true })
        .then(doc => {
            res.json(doc)
        }).catch(err => {
            res.status(500).json(err)
        })
})

//Delete synergy
router.delete('/synergy/:name', (req, res) => {
    SynergyModel.findOneAndRemove({
        name: req.params.name
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router