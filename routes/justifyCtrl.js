let jwtUtils = require('../utils/jwt.utils')
let arrayComptes = require('../compte').arrayComptes

let getJustify = function (req, res) {
    res.status(200).render('justify/justify-form')
}

let postJustify = function (req, res) {
    let strTexte = req.body.texte
    if (strTexte.trim().length === 0)  // Si le texte est vide
        return res.status(400).render('justify/justify-form', {blank: true})

    let account = getAccount(req.body.token)
    if (account === undefined) // Si l'utilisateur ne s'est pas authentifié
        return res.status(401).render('justify/justify-noauth')

    let nbMots = account.nbMots - countWordsInString(strTexte)
    if (nbMots < 0) {  // Si le quota de mots à traiter est dépassé
        res.status(402).setHeader('content-type', 'text/plain')
        return res.send("Error 402 Payment Required")
    }

    // Si tout c'est bien passé ->
    account.nbMots = nbMots // On set le nouveau nombre de mots restant au compte
    res.status(200).setHeader('content-type', 'text/plain')
    return res.send(manageText(strTexte))
}



module.exports = {getJustify, postJustify}


// Retourne le nb de mots dans la phrase passé en paramètre
function countWordsInString(str) {
    return str.trim().split(/\s+/).length;
}

// Retourne l'objet account de l'array dont l'email
// est le même que celui passé en paramètre
function findAccountByEmail(email) {
    return arrayComptes.find(function (compte) {
        return compte.email === email
    })
}

// Retourne l'email apres avoir décodé le token passé en paramètre
function getAccount(strToken) {
    let email = undefined
    if (strToken !== undefined)
        email = jwtUtils.getEmailByToken(strToken)
    return findAccountByEmail(email)
}

// Fonction qui qui va retourner la chaine de charactères traité
// dont chaque ligne contiendra 80 caractères
function manageText(strTexte) {
    return strTexte.replace(/(.{80})/g, "$1\n")
}