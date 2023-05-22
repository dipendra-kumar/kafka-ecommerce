const router = require('express').Router();
const Auth = require('../middlewares/auth');
const { validateRegister, validateLogin, validateChangePassword } = require("../middlewares/authValidations")
const { signup, login, logout, logoutAll, getUser, changePassword } = require('../controllers/user');

router.post('/users', validateRegister, signup)
router.post('/users/login', validateLogin, login)
router.get('/getCurrentUser', Auth, getUser)
router.patch('/users/changePassword', Auth, validateChangePassword, changePassword)
router.post('/users/logout', Auth, logout)
router.post('/users/logoutAll', Auth, logoutAll)


module.exports = router