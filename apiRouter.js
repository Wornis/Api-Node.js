let express = require('express')
let justifyCtrl = require('./routes/justifyCtrl')
let tokenCtrl = require('./routes/tokenCtrl')
let defaultCtrl = require('./routes/defaultCtrl')

let router = (function () {
    let apiRouter = express.Router()

    apiRouter.route('/api/justify/')
        .get(justifyCtrl.getJustify)
        .post(justifyCtrl.postJustify)

    apiRouter.route('/api/token/')
        .get(tokenCtrl.getToken)
        .post(tokenCtrl.postToken)

    apiRouter.route('/').all(defaultCtrl.allDefaultRoute)

    return apiRouter
})()

module.exports = {router}
