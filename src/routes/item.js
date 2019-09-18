const express = require('express')
const router = express.Router()
const ItemModel = require('../models/item.model')

//Create a new item
router.post('/item', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missiing')
    }

    let model = new ItemModel(req.body)
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

//Get all items
router.get('/item', (req, res) => {
    ItemModel.find()
        .then(doc => {
            res.json(doc)
        }).catch(err => {
            res.status(500).json(err)
        })
})

//Get item by name
router.get('/item/:name', (req, res) => {
    ItemModel.findOne({
        name: req.params.name
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Update item
router.put('/item/:name', (req, res) => {
    ItemModel.findOneAndUpdate({
        name: req.params.name
    }, req.body, { new: true })
        .then(doc => {
            res.json(doc)
        }).catch(err => {
            res.status(500).json(err)
        })
})

//Delete item
router.delete('/item/:name', (req, res) => {
    ItemModel.findOneAndRemove({
        name: req.params.name
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router