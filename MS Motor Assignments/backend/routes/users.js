
const express = require('express');
const app = express()
const multer = require('multer')
const path = require('path');

const router = express.Router();

const user = require('../controllers/userController')


router.post('/register-user', user.createUser)

router.post('/login-user', user.loginUser)





module.exports = router;