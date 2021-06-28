const controller = require('../controllers/users')
const express =  require('express')
const router = express.Router()


router.post("/create-user-db", controller.createUsers)
router.post("/create-user-fireauth", controller.loginWithEmail)


router.get("/verify-username-login/:username", controller.verifyUsernameLogin)



module.exports = router