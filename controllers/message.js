const Message=require('../models/message');

exports.postmessage=(req,res,next)=>{
    console.log(req.body.message);
    Message.create({message:req.body.message,userId:req.user.id}).then(result=>{
        res.status(201).json(result);
    })
}

exports.getmessage=(req,res,next)=>{
    Message.findAll({where:{userId:req.user.id}}).then(result=>{
        res.status(201).json(result);
    }).catch(err=>{
        res.status(400).json({success:false,message:'Something went wrong'})
    })
}