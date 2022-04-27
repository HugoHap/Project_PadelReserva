const router = require("express").Router()

const Club = require("../models/Club.model")
const Match = require("./../models/Match.model")
const Comment = require("./../models/Comment.model")


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

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    const promises = [
        Match.findById(id).populate("club").populate("players"),
        Comment.find({ 'match': { $eq: id } }).populate("user"),
    ]

    Promise
        .all(promises)
        .then(([detMatch, comments]) => res.render('matches/match-details', { detMatch, comments }))
        .catch(err => console.log(err))
})

router.post('/:id/unirse', (req, res) => {

    const { id } = req.params
    const { _id } = req.session.currentUser

    Match
        .findByIdAndUpdate(id, { $addToSet: { players: _id } })
        .then(() => res.redirect("/partidos"))
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
        .populate("players")
        .populate("club")
        .then(editMatch => {
            res.render('matches/match-edit', {
                editMatch
            })
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { date, genre, players, club } = req.body

    Match
        .findByIdAndUpdate(id, { date, genre, players, club })
        .then(() => res.redirect("/partidos"))
        .catch(err => console.log(err))
})

router.post('/:matchID/edit/eliminar-jugador/:playerID', (req, res) => {

    const { matchID, playerID } = req.params

    Match
        .updateOne({ matchID }, { $pull: { players: playerID } })
        .then(() => res.redirect("/partidos"))
        .catch(err => console.log(err))
})


// Results form

router.get('/:id/resultado', (req, res, next) => {
    res.render('matches/result-form')
});

router.post('/:id/resultado', (req, res, next) => {
    const { id } = req.params
    const { set1team1, set1team2, set2team1, set2team2, set3team1, set3team2 } = req.body

    const result = {
        set1: {
            team1: set1team1,
            team2: set1team2,
        },
        set2: {
            team1: set2team1,
            team2: set2team2,
        },
        set3: {
            team1: set3team1,
            team2: set3team2,
        },
    }

    Match
        .create(id, { set1team1, set1team2, set2team1, set2team2, set3team1, set3team2 })
        .then(result => {
            res.redirect('/partidos/:id')
        })
        .catch(err => console.log(err))
});

module.exports = router



