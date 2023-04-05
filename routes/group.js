const express=require('express');
const router=express.Router();
const userAuthentication=require('../middleware/auth')
const groupController=require('../controllers/group')
router.post('/creategroup',userAuthentication.authenticate,groupController.creategroup)
router.get('/getgroup',userAuthentication.authenticate,groupController.getgroup)
router.get('/getgroupmessage',userAuthentication.authenticate,groupController.getgroupmessage)
router.post('/joingroup',userAuthentication.authenticate,groupController.joingroup)
router.get(`/getgroupuser/:id`,userAuthentication.authenticate,groupController.getgroupuser)
router.get('/removefromgroup/:userId/:gid',userAuthentication.authenticate,groupController.removefromgroup)
router.get('/makeadmin/:userId/:gid',userAuthentication.authenticate,groupController.makeadmin)

module.exports=router;