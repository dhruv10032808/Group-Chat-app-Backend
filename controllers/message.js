const Message=require('../models/message');
const Sequelize=require('sequelize');
const {gt, lte, ne, in: opIn} = Sequelize.Op;

exports.postmessage=(req,res,next)=>{
    console.log(req.body.message);
    Message.create({message:req.body.message,userId:req.user.id}).then(result=>{
        res.status(201).json(result);
    })
}

exports.getmessage=(req,res,next)=>{
    var lastid=req.params.lastmsgid;
    console.log(lastid)
    if(lastid==="undefined"){
        lastid=1;
    }
    console.log(lastid==="undefined");
    Message.findAll({ where: {
        id:
        {
            [gt]: lastid
        }
      }
    }).then(result=>{
        res.status(201).json({message:result});
    }).catch(err=>{
        res.status(400).json({success:false,message:'Something went wrong'})
    })
}