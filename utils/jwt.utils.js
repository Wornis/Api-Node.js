let jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'fnwp5lt7h3nb6w16896foyk2vyzsg1ivf7zlkheh7dm6nhbmleqdef2a'

let generateTokenForUser = function (email) {
    return jwt.sign({
            email: email,
        },
        JWT_SIGN_SECRET
    )
}

let getEmailByToken = function(token) {
    return jwt.verify(token, JWT_SIGN_SECRET, function (err, decoded) {
        if (err)
            console.log(err)
        else
            return decoded.email
    })
}

module.exports = {generateTokenForUser, getEmailByToken}