const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const api = require('./server/routes/api')

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')))

app.use(express.urlencoded({extends: true}))
app.use(express.json())

app.use('/api', api)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/vdoApp/index.html'))
})

app.listen(port, function () {
    console.log("server running on localhost:" + port)
} )