const router = require("express").Router()
const User = require("../models/User.model")


// User profile 

router.get('/perfil/:id', (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(player => {
            res.render('user/profile-page', { player })
        })
        .catch(err => console.log(err))
})



// Edit user profile 

router.get('/perfil/:id/edit', (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(player => {
            res.render('user/edit-form', player)
        })
        .catch(err => console.log(err))
})

router.post('/perfil/:id/edit', (req, res, next) => {

    const { id } = req.params
    const { name, favouriteClubs, avatar, friends } = req.body

    User
        .findByIdAndUpdate(id, { name, favouriteClubs, avatar, friends }, { new: true })
        .then(player => {
            res.redirect('/perfil/:id')
        })
        .catch(err => console.log(err))
})



// Delete profile

router.post('/perfil/:id/delete', (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/perfil/:id')
        })
        .catch(err => console.log(err))
});


module.exports = router