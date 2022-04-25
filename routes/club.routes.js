const router = require("express").Router()

const Club = require("./../models/Club.model")
const User = require("./../models/User.model")

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


// Club profile 

router.get('/:id', (req, res, next) => {

    const { id } = req.params

    Club
        .findById(id)
        .then(club => {
            res.render('clubs/club-details', club)
        })
        .catch(err => console.log(err))
})






// router.get('/', isLoggedIn, (req, res, next) => {

//     Club
//         .find()
//         .then(clubs => {
//             res.render('clubs/club-list.hbs', { clubs })
//         })
//         .catch(err => console.log(err))
// })

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

// router.get('/:id', (req, res) => {

//     const { id } = req.params

//     Match
//         .findById(id)
//         .populate("ta")
//         .populate("leadTeacher")
//         .populate("students")
//         .then(detMatch => {
//             res.render('matches/match-details', detMatch)
//         })
//         .catch(err => console.log(err))
// })

// router.post('/:id/delete', (req, res) => {

//     const { id } = req.params

//     Course
//         .findByIdAndDelete(id)
//         .then(() => {
//             res.redirect('/courses')
//         })
//         .catch(err => console.log(err))
// })

// router.get('/:id/edit', (req, res) => {

//     const { id } = req.params

//     Course
//         .findById(id)
//         .then(editCourse => {
//             User
//                 .find()
//                 .then(editUser => {
//                     res.render('courses/edit-course', { editUser, editCourse })
//                 })
//                 .catch(err => console.log(err))
//         })
//         .catch(err => console.log(err))
// })

module.exports = router