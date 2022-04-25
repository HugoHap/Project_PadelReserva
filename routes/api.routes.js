const router = require('express').Router()
const Club = require('../models/Club.model')


router.get('/clubs', (req, res) => {

    Club
        .find()
        .then(clubs => res.json(clubs))
        .catch(err => console.log(err))
})


module.exports = router

