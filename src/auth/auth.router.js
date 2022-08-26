const router = require('express').Router()
const { login } = require('./auth.http')
const { register } = require('../users/users.http')

router.post('/login', login)
router.post('/register', register)


exports.router = router