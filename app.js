let http = require('http')
let express = require('express');
const path = require('path');
let app = express()
let server = http.createServer(app)

let port = process.argv[2] || 80;
server.listen(port)
console.log('Servidor http rodando na porta', port)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    // res.send('Servidor Web Rodando na porta ' + port)
})

app.get('/teste', (req, res) => {
    res.send('Estamos em /teste no Servidor Web da porta ' + port)
})