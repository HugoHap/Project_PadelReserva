const router = require("express").Router()

const Club = require("../models/Club.model")
const Match = require("./../models/Match.model")

const User = require("./../models/User.model")


router.get('/', (req, res) => {
    Match
        .find()
        .then(matches => {
            res.render('matches/match-list.hbs', { matches})
        })
        .catch(err => console.log(err))
})

router.get("/crear",(req, res, next) => {
 
    Club
        .find()
        .then(clubes => res.render('matches/match-create.hbs', { clubes }))
        .catch(() =>
            console.log(err)
        )

})

router.post('/crear', (req, res) => {
    const { date, club, price, genre, time} = req.body

    Match
        .create({ date, club, price, genre, time })
        .then(() => {
            res.redirect(`/partidos`)
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    Match
        .findById(id)
        .populate("ta")
        .populate("leadTeacher")
        .populate("students")
        .then(detMatch => {
            res.render('matches/match-details', detMatch)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Course
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/courses')
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Course
        .findById(id)
        .then(editCourse => {
            User
                .find()
                .then(editUser => {
                    res.render('courses/edit-course', { editUser, editCourse })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

module.exports = router