const express=require('express');
const router=express.Router();
const userAuthentication=require('../middleware/auth')
const groupController=require('../controllers/group')
router.post('/creategroup',userAuthentication.authenticate,groupController.creategroup)
router.get('/getgroup',userAuthentication.authenticate,groupController.getgroup)
router.get('/getgroupmessage',userAuthentication.authenticate,groupController.getgroupmessage)
router.post('/joingroup',userAuthentication.authenticate,groupController.joingroup)

module.exports=router;