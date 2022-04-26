const router = require("express").Router()

const Club = require("./../models/Club.model")
const User = require("./../models/User.model")
const Match = require("./../models/Match.model")

const { isLoggedIn } = require('../middleware/route-guard.js')


// Clubs list

router.get('/', isLoggedIn, (req, res, next) => {

    Club
        .find()
        .then(clubs => {
            res.render('clubs/club-list', { clubs })
        })
        .catch(err => console.log(err))
})



// Club create

router.get("/crear", (req, res, next) => {

    res.render('clubs/club-create.hbs')

})

router.post('/crear', (req, res) => {
    const { name, street, city, zip, image, longitude, latitude } = req.body

    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }
    const address = {
        street: street,
        city: city,
        zip: zip
    }

    Club
        .create({ name, address, image, location })
        .then(() => {
            res.redirect(`/clubs`)
        })
        .catch(err => console.log(err))
})


// Club profile 

router.get('/:id', (req, res, next) => {

    const { id } = req.params
    const user = req.session.currentUser

    Club
        .findById(id)
        .then(club => {

            Match
                .find({ 'club': { $eq: id } })
                .then(match => {
                    res.render('clubs/club-details', { club, match })
                })
                .catch(err => console.log(err))
        })
})


// Favourite club 

router.post('/:id/favourite', (req, res, next) => {

    const { id } = req.params
    const { _id } = req.session.currentUser

    User
        .findByIdAndUpdate(_id, { $addToSet: { favouriteClubs: id } })
        .then(() => {
            res.redirect(`/clubs/${id}`)
        })
        .catch(err => console.log(err))
})


// Edit club

router.get('/:id/editar', (req, res, next) => {

    const { id } = req.params

    Club
        .findById(id)
        .then(club => {
            res.render('clubs/club-edit', club)
        })
        .catch(err => console.log(err))
})

router.post('/:id/editar', (req, res) => {

    const { id } = req.params
    const { name, street, city, zip, longitude, latitude, image } = req.body

    Club
        .findByIdAndUpdate(id, { name, street, city, zip, longitude, latitude, image }, { new: true })
        .then(club => {
            res.redirect('/clubs')
        })
        .catch(err => console.log(err))
})


// Delete club 

router.post('/:id/eliminar', (req, res) => {

    const { id } = req.params

    Club
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/clubs')
        })
        .catch(err => console.log(err))
})


module.exports = router