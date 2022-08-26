const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middlewares/adminRole')
require('../middlewares/auth.middleware')(passport)

const usersHttp = require('./users.http')

router.route('/')
    .get(usersHttp.getAll)
    .post(usersHttp.register)

router.route('/me')
    .get(passport.authenticate('jwt',{session: false}), usersHttp.getMyUser)
    .put(passport.authenticate('jwt',{session: false}), usersHttp.updateMyUser )
    .delete(passport.authenticate('jwt',{session:false}), usersHttp.removeMyUser )

router.route('/:id')
    .get(passport.authenticate('jwt',{session: false}), usersHttp.getById)
    .put(passport.authenticate('jwt',{session:false}), roleAdminMiddleware , usersHttp.update)
    .delete(passport.authenticate('jwt',{session:false}), roleAdminMiddleware, usersHttp.remove)



exports.router = router