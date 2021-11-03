const express = require('express')
const UserController = require("../controllers/userController")

const router = express.Router()

router.get('/users', UserController.getDocuments) // TODO: this is just for testing
router.get('/user/:email', UserController.getUserByEmail)
router.post('/user', UserController.createDocument)
router.delete('/user/:id', UserController.deleteDocument)
router.put('/user/:id', UserController.updateDocument)

module.exports = router