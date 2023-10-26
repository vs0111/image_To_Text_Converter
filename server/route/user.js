const express = require('express')
const userController =require('../controller/userController')
const upload = require('../multer/upload')

const router = express()

router.post('/upload/image',upload.single("image"),userController.uploadImage)


module.exports=router