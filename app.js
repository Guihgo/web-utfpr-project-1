let http = require('http')
const fs = require('fs')
let express = require('express')
const path = require('path')
const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
const cors = require('cors')

const Model = require("./model/index")
const {APIController} = require('./controller/index')

dotenv.config()
let app = express()
let server = http.createServer(app)

let port = process.env.PORT || 8080

const dbClient = new MongoClient(process.env.DB_URI)

const DB_USER_KEY = 'DB_USER'
const DB_CONTENT_KEY = 'DB_CONTENT'

async function run() {

    try {
        console.log(`[DB] Connecting to database...`)
        dbClient.connect().then((c)=>{
            this.DB = c.db(process.env.DB_NAME)
            // this.DB.collection('user').insertOne()
            Model.init({
                user: this.DB.collection('user'),
                content: this.DB.collection('content'),
            })
           
            console.log(`[DB] Connected to ${(this.DB.namespace) }`)
            setupWebserver()
        
        })
    } finally {}
}

run().catch(e=>{
    console.error(`Something is wrong`, e)
})

process.on('exit', async ()=>{
    console.log(`Exiting and closing connections...`)
    await dbClient.close()
    console.log(`All DB connections were closed`)
})

const setupWebserver = () => {
    server.listen(port)
    console.log(`[WebServer] Running on port ${port}`)

    app.set('DB', this.DB)
    app.set(DB_USER_KEY, this.DB_USER)
    app.set(DB_CONTENT_KEY, this.DB_CONTENT)

    app.use(cors())

    app.use(express.static('public'))

    app.use(express.json())

    app.get('/', (req, res) => {
        const index = fs.readFileSync(path.join(__dirname, 'view/index.html')).toString()
        res.send(index.replace('{{HTTP_URL}}', process.env.HTTP_URL))
    }) 
    app.use('/api', APIController)
}
