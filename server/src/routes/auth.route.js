const multer = require('multer')
const upload = multer({ dest: "uploads/" });
const express = require('express')
const router = express.Router()
const {signUp, signIn, signOut, deleteUser} = require('../controllers/auth.controller');
const { verifyToken } = require('../utils/verify');

router.post('/sign_up', upload.array("files"), signUp)
router.post('/sign_in', upload.array("files"), signIn)
router.get('/sign_out', upload.array("files"), signOut)
router.delete('/delete/:id', [verifyToken, upload.array("files")], deleteUser)

module.exports = router