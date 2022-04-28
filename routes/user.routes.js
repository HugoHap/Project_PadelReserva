const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn } = require('../middleware/route-guard')
const { isLoggedOut } = require('../middleware/route-guard')



// User profile 

router.get('/', isLoggedIn, (req, res, next) => {

    const { _id } = req.session.currentUser

    User
        .findById(_id)
        .then(player => {
            res.render('user/profile-page', player)
        })
        .catch(err => console.log(err))
})

// Edit user profile 

router.get('/:id/editar', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(player => {
            res.render('user/edit-form', player)
        })
        .catch(err => console.log(err))
})


router.post('/:id/editar', (req, res, next) => {

    const { id } = req.params
    const { name, avatar, email } = req.body

    User
        .findByIdAndUpdate(id, { name, avatar, email }, { new: true })
        .then(player => {
            res.redirect('/perfil')
        })
        .catch(err => console.log(err))
})

// Delete profile

router.post('/:id/eliminar', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
});



module.exports = router