let http = require('http')
let express = require('express');
const path = require('path');
let app = express()
let server = http.createServer(app)

let port = process.env.PORT || 8080;
server.listen(port)
console.log('Servidor http rodando na porta', port)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    // res.send('Servidor Web Rodando na porta ' + port)
})

/* Auth Middleware */
app.use((req, res, next)=>{
    console.log(`TODO: auth middle`)
    /* if(!isAuth) {
        return res.redirect('/#login')
    }
    */
    next()
}) 

app.get('/app', (req, res)=>{
    res.sendFile(path.join(__dirname, 'app.html'))
})

app.get('/teste', (req, res) => {
    res.send('Estamos em /teste no Servidor Web da porta ' + port)
})