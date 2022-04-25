const router = require("express").Router()

const Club = require("../models/Club.model")
const Match = require("./../models/Match.model")

const User = require("./../models/User.model")


router.get('/', (req, res) => {
    Match
        .find()
        .populate("club")
        .then(matches => {
            res.render('matches/match-list.hbs', { matches })
        })
        .catch(err => console.log(err))
})

router.get("/crear", (req, res, next) => {

    Club
        .find()
        .then(clubes => res.render('matches/match-create.hbs', { clubes }))
        .catch(() =>
            console.log(err)
        )

})

router.post('/crear', (req, res) => {
    const { date, club, price, genre, time } = req.body
    const { _id } = req.session.currentUser

    Match
        .create({ date, club, price, genre, time, players: _id })
        .then(() => {
            res.redirect(`/partidos`)
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    Match
        .findById(id)
        .populate("club")
        .populate("players")
        // .populate("")
        .then(detMatch => {
            res.render('matches/match-details', detMatch)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Match
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/partidos')
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Match
        .findById(id)
        .populate("club")
        .then(editMatch => {
            res.render('matches/match-edit', { editMatch
})
        })
        .catch(err => console.log(err))
})

module.exports = router