const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

// Signup
router.get('/registro', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/registro', (req, res, next) => {

    const { password } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(() => res.redirect('/'))
        .catch(error => next(error))
})



// Login
router.get('/iniciar-sesion', (req, res, next) => {
    res.render('auth/login')
})

router.post('/iniciar-sesion', (req, res, next) => {

    const { email, password } = req.body
    console.log(req.body);

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                console.log(user);
                req.session.currentUser = user
                console.log(req.session);
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})


// Logout
router.post('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router