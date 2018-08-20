let jwtUtils = require('./utils/jwt.utils')
let isEmail = require('validator/lib/isEmail')
let CronJob = require('cron').CronJob;

let arrayComptes = [] // Array comptenant les objets comptes (email, nbMots)

// Créee et retourne un compte à l'aide de l'email
// passé en paramètre et l'ajoute à l'array
function createCompte(email) {
    let compte = {
        email: email,
        token: jwtUtils.generateTokenForUser(email),
        nbMots: 80000
    }
    arrayComptes.push(compte)
    return compte
}

/* Retourne l'objet compte de l'email si déjà créee sinon false */
function emailExist(email) {
    for (let i = 0; i < arrayComptes.length; i++) {
        if (arrayComptes[i].email === email)
            return arrayComptes[i]
    }
    return false
}


function isEmailValid(email) {
    return isEmail(email)
}


// Le cron qui va reset le quota des mots des utilisateurs
// Il se lancera tous les jours à 00:00:01
new CronJob('01 00 00 * * *', function () {
    arrayComptes.forEach(function (compte) {
        compte.nbMots = 80000
    })
}).start()

module.exports = {createCompte, emailExist, isEmailValid, arrayComptes: arrayComptes}
