const router = require('express').Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const postsHttp = require('./posts.http')


router.route('/posts')
    .get(postsHttp.getAll)
    .post(passport.authenticate('jwt',{session: false}),postsHttp.create)

router.get('/posts/:id', postsHttp.getById)


// profe estas rutas las iba a manejar en user.router y solo ponerle: 
//  -  /me/post
//  -  /me/posts/:id
// y manejar el prefijo de las rutas en app de posts: '/api/v1/posts', al final lo meneje aqui por separado, pero la verdad quize manejarlo alla pero tenia dudas derrepente usted no esperaba eso.. xD, espero su feed

router.get('/users/me/posts', passport.authenticate('jwt',{session: false}), postsHttp.getMyUser)

router.route('/users/me/posts/:id')
    .get(passport.authenticate('jwt',{session: false}),postsHttp.getMyUserById)
    .put(passport.authenticate('jwt',{session: false}),postsHttp.updateMyPost)
    .delete(passport.authenticate('jwt',{session: false}),postsHttp.deleteMyPost)


exports.router = router