const router = require('express').Router()
const ImageUpload = require('express-azure-image-upload')
const Upload = require('./uploadsmodel.js')
require('dotenv').config()



function imageHandler(req, res, next){
    const image=
    const storageAcct = process.env.STORAGE_ACCT;
    const storagekey = process.env.STORAGE_KEY;
    const storageContainer = process.env.STORAGE_CONTAINER;
    const imageUpload = new ImageUupload(storageAcct, storagekey, storageContainer )

    return imageUpload.handler;
}


router.post('/upload', imageHandler(req, res, next));