const express = require('express')
const app = express()
const reloadMagic = require('./reload-magic.js')
const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID
const multer = require('multer')
const upload = multer({ dest: __dirname + '/uploads/itemImages' })
const sha1 = require('sha1')
const cookieParser = require('cookie-parser')
const uuidv1 = require('uuid/v1')
app.use(cookieParser())

let dbo = undefined
let url = "mongodb+srv://theo:theo@cluster0-xnzrm.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(url, { newUrlParser: true }, (err, client) => {
    dbo = client.db("marketplace")
})

const sessions = {}

reloadMagic(app)

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/uploads', express.static('uploads'));// Needed for local assets

// Your endpoints go after this line

app.get('/session', (req, res) => {
    let sessionId = req.cookies.sid
    console.log('sessions', sessions)
    if (sessions[sessionId]) {
        console.log('success', sessions[sessionId])
        return res.send(JSON.stringify({ success: true, username: sessions[sessionId] }))
    }
    res.send(JSON.stringify({ success: false }))
})

app.get('/get-items', async (req, res) => {
    console.log('getitems when oppening')
    let arrayOfItems = await dbo.collection('items').find().toArray()
    res.send(JSON.stringify({ success: true, items: arrayOfItems }))
})

app.get('/get-user-data', async (req, res) => {
    console.log('get user data profile called')
    const sessionId = req.cookies.sid
    let user = await dbo.collection("users").findOne({ username: sessions[sessionId] })
    console.log('user got', user)
    res.send(JSON.stringify(user))
})

app.post('/signup', upload.none(), (req, res) => {
    console.log('Singin-up requested', req.body)
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    dbo.collection("users").findOne({ username }, (err, user) => {
        if (err) {
            console.log("singup error!")
            return res.send(JSON.stringify({ success: false, desc: "Sign up error" }))
        }
        if (user === null) {
            console.log('signup processing')
            dbo.collection('users').insertOne({ username, password: sha1(password), email })
            let sessionId = uuidv1()
            sessions[sessionId] = username
            res.cookie('sid', sessionId)
            return res.send(JSON.stringify({ success: true, desc: "Signup successful!!", username }))
        }
        if (user) {
            return res.send(JSON.stringify({ success: false, desc: "Username Taken" }))
        }
        res.send(JSON.stringify({ success: false, desc: "Error" }))
    })
})

app.post('/login', upload.none(), (req, res) => {
    console.log('Login requested', req.body)
    let username = req.body.username
    let password = req.body.password
    console.log(sha1(password))
    dbo.collection("users").findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('login error')
            return res.send(JSON.stringify({ success: false }))
        }
        if (user === null) {
            console.log('invalid username')
            return res.send(JSON.stringify({ success: false, desc: 'Invalid username or password!' }))
        }
        if (user.password !== sha1(password)) {
            console.log('login failed')
            return res.send(JSON.stringify({ success: false, desc: 'Invalid password!', username }))
        }
        if (user.password === sha1(password)) {
            console.log('login success')
            let sessionId = uuidv1()
            sessions[sessionId] = username
            res.cookie('sid', sessionId)
            return res.send(JSON.stringify({ success: true, desc: 'Login successful!', username }))
        }
        res.send(JSON.stringify({ success: false, desc: "Error" }))
    })
})

app.post('/logout', (req, res) => {
    console.log('logout requested')
    let sessionId = req.cookies.sid
    console.log('sessionID', sessionId)
    delete sessions.sessionId
    res.send(JSON.stringify({ success: true, desc: 'logout successful' }))
})

app.post('/add-item', upload.array('photos', 8), (req, res) => {
    console.log(req.files)
    let files = req.files
    console.log('filesuploaded: ', files)
    let filesPaths = []
    for (let i = 0; i < files.length; i++) {
        filesPaths.push('/uploads/itemImages/' + files[i].filename)
    }
    dbo.collection('items').insertOne({
        filesPaths,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        seller: req.body.username,
        year: req.body.year,
        brand: req.body.brand,
        type: req.body.type
    })
    res.send(JSON.stringify({ success: true }))
})

app.post('/buy-item', upload.none(), (req, res) => {
    console.log('buy-tem called')
    const sessionId = req.cookies.sid
    const order = JSON.parse(req.body.cart)
    dbo.collection("users").updateOne({ username: sessions[sessionId] }, { $set: { purchases: order } })
    order.forEach(item => {
        dbo.collection("items").deleteOne({ _id: ObjectID(item._id) })
    })
    console.log('bought items', order)
    res.send(JSON.stringify({ success: true }))
})

// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
