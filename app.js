let express = require ('express')
let bodyParser = require('body-parser')
let apiRouter = require('./apiRouter').router

let app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public')) // Récupération dynamique des assets
app.set('view engine', 'ejs'); // Moteur de rendu de vues définitif
app.use(apiRouter)
app.listen(3000)





