let express = require('express')
let app = express()
let reloadMagic = require('./reload-magic.js')
let MongoDB = require('mongodb')
let MongoClient = MongoDB.MongoClient;
let ObjectID = MongoDB.ObjectID
let multer = require('multer')
let upload = multer({ dest: __dirname + '/uploads/' })
let sha1 = require('sha1')

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
    dbo.collection("users").findOne({ username }, (err, user) => {
        if (err) {
            console.log("singup error!")
            return res.send(JSON.stringify({ success: false, desc: "Sign up error" }))
        }
        if (user === null) {
            console.log('signup processing')
            dbo.collection('users').insertOne({ username, password: sha1(password) })
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
            return res.send(JSON.stringify({ success: true, desc: 'Login successful!', username }))
        }
        res.send(JSON.stringify({ success: false, desc: "Error" }))
    })
})

// Your endpoints go before this line

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })
