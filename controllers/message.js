const Message=require('../models/message');
const {Sequelize,Op}=require('sequelize');
const User = require('../models/user');
const {gt, lte, ne, in: opIn} = Sequelize.Op;

exports.postmessage=(req,res,next)=>{
    const groupid=req.query.gid
    console.log(req.body.message);
    Message.create({message:req.body.message,userId:req.user.id,groupId:groupid}).then(result=>{
        res.status(201).json(result);
    })
}

exports.getmessage=(req,res,next)=>{
    var lastid=req.params.lastmsgid;
    if(lastid==="undefined"){
        lastid=0;
    }
    Message.findAll({
        attributes:['message','id'],
        include:[
        {
            model:User,
            attributes:['name']
        }
    ],
    where:{id:{[Op.gt]:lastid}}
      }).then(result=>{
        res.status(201).json({message:result});
    }).catch(err=>{
        res.status(400).json({success:false,message:'Something went wrong'})
    })
}