let http = require('http')
let express = require('express')
let app = express()
let server = http.createServer(app)

let port = process.argv[2] || 80;
server.listen(port)
console.log('Servidor http rodando na porta', port)

app.get('/', (req, res) => {
    res.send('Servidor Web Rodando na porta ' + port)
})

app.get('/teste', (req, res) => {
    res.send('Estamos em /teste no Servidor Web da porta ' + port)
})