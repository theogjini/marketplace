let express = require('express')
let app = express()
let reloadMagic = require('./reload-magic.js')
let MongoDB = require('mongodb')
let MongoClient = MongoDB.MongoClient;
let ObjectID = MongoDB.ObjectID
let multer = require('multer')
let upload = multer({ dest: __dirname + '/uploads/' })

let dbo = undefined

let url = "mongodb+srv://theo:theo@cluster0-xnzrm.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(url, { newUrlParser: true }, (err, client) => {
    dbo = client.db("marketplace")
})

console.log(dbo)

reloadMagic(app)

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/uploads', express.static('uploads'));// Needed for local assets

// Your endpoints go after this line

app.post('/signup', upload.none(), (req, res) => {
    console.log('Singin-up requested', req.body)
    let username = req.body.username
    let password = req.body.password
    res.send(JSON.stringify({ success: true }))
})


app.post('/login', upload.none(), (req, res) => {
    console.log('Login requested', req.body)
    let username = req.body.username
    let password = req.body.password
    res.send(JSON.stringify({ success: true }))
})

// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
