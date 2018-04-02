const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))
app.use(bodyParser.json())
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))
app.use(methodOverride());

app.get('*', function (req, res) {
    res.sendfile(__dirname + '/dist/index.html')
})

app.listen(8080);
console.log("App listening on port 8080")