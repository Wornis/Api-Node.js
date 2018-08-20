let Cookies = require('cookies')
let {createCompte, emailExist, isEmailValid, arrayComptes} = require('../compte')

let getToken = function (req, res) {
    res.render('token/token-form', {arrComptes: arrayComptes})
}

let postToken = function (req, res) {
    let email = req.body.email
    if (!isEmailValid(email))  // Si le format de l'email est invalide
        return res.status(400).render('token/token-form', {
            msgEmail: true,
            arrComptes: arrayComptes
        })

    let compte = emailExist(email)
    if (compte === false) { // Si l'email n' a pas encore été créée
        compte = createCompte(email)
    }
    new Cookies(req, res).set('token', compte.token, {
        httpOnly: false, //On crée le cookie avec le token accessible via JS
        secure: false
    })
    // Si tout s'est bien passé
    res.status(200).setHeader('content-type', 'application/json')
    res.send({
        email : compte.email,
        token : compte.token
    })
}

module.exports = {getToken, postToken}


