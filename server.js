/*global __dirname */
let express = require('express'),
path = require('path'),
console = require('console'),
app = express()
app.set('port', 80)
app.use(express.static(path.join(__dirname, './dist/')))
app.listen(app.get('port'), () => console.log(`The server is running on http://localhost:${app.get('port')}`))