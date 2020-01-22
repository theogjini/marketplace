const express = require('express')
const app = express()
const reloadMagic = require('./reload-magic.js')
const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID
const multer = require('multer')
const upload = multer({ dest: __dirname + '/uploads/' })
const sha1 = require('sha1')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

let dbo = undefined

let url = "mongodb+srv://theo:theo@cluster0-xnzrm.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(url, { newUrlParser: true }, (err, client) => {
    dbo = client.db("marketplace")
})

reloadMagic(app)

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/uploads', express.static('uploads'));// Needed for local assets

// Your endpoints go after this line

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
            return res.send(JSON.stringify({ success: true, desc: "Signup successful!!" }))
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
            let sessionId = '' + Math.floor(Math.random() * 100000000)
            dbo.collection("sessions").insertOne({ sessionId, username })
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
    dbo.collection("sessions").deleteOne({ sessionId: sessionId })
    res.send(JSON.stringify({ success: true, desc: 'logout successful' }))
})

app.get('/session', (req, res) => {
    let sessionId = req.cookies.sid
    console.log('sessionID', sessionId)
    dbo.collection('sessions').findOne({ sessionId: sessionId }, (err, user) => {
        if (err) {
            console.log('error', err)
            return res.send(JSON.stringify({ success: false }))
        }
        if (user === null) {
            console.log('null', user)
            return res.send(JSON.stringify({ success: false }))
        }
        if (user) {
            console.log('success', user)
            return res.send(JSON.stringify({ success: true, username: user.username }))
        }
        res.send(JSON.stringify({ success: false }))
    })
})

// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
