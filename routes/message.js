const express=require('express');
const router=express.Router();
const userAuthentication=require('../middleware/auth')
const messageController=require('../controllers/message')
router.post('/message',userAuthentication.authenticate,messageController.postmessage);
router.get('/message/:lastmsgid',userAuthentication.authenticate,messageController.getmessage);

module.exports=router;