const Message=require('../models/message');

exports.postmessage=(req,res,next)=>{
    console.log(req.body.message);
    Message.create({message:req.body.message,userId:req.user.id}).then(result=>{
        res.status(201).json(result);
    })
}