// Depencias
const express = require('express')
const config = require('./config')

// Archivos de rutas
const usersRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router
const postRouter = require('./posts/posts.router').router


// Configuracion basica
const app = express()

// Configuracion para habilitar el manejo del req.body
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Peticion get'})
})

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1', postRouter)


app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)
})
