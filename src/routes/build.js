const express = require('express')
const router = express.Router()
const BuildModel = require('../models/build.model')

//Create a new build
router.post('/build', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missiing')
    }

    let model = new BuildModel(req.body)
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

//Get all builds
router.get('/build', (req, res) => {
    BuildModel.find()
        .then(doc => {
            res.json(doc)
        }).catch(err => {
            res.status(500).json(err)
        })
})

//Get build by id
router.get('/build/:id', (req, res) => {
    BuildModel.findOne({
        _id: req.params.id
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Delete build
router.delete('/build/:id', (req, res) => {
    BuildModel.findOneAndRemove({
        _id: req.params.id
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router