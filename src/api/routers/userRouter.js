const express = require('express')
const UserController = require("../controllers/userController")

const router = express.Router()

router.get('/users', UserController.getDocuments) // TODO: this is just for testing
router.get('/user/:email', UserController.getOrCreateUserByEmail) // TODO: figure out a better way to create the target url
router.post('/user', UserController.createDocument)
router.delete('/user/:id', UserController.deleteDocument)
router.put('/user/:id', UserController.updateDocument)

module.exports = router