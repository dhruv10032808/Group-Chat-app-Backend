const User=require('../models/user');
const bcrypt=require('bcrypt')

exports.signup=(req,res,next)=>{
    User.findAll({where:{email:req.body.email}}).then(users=>{
        if(users.length>0){
          return res.status(400).json({message:'User already exists'})
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    console.log('something went wrong')
                }
                User.create({
                    name:req.body.name,
                    email:req.body.email,
                    phone_number:req.body.phone,
                    password:hash
                }).then(result=>{
                    res.status(201).json({newUserDetail:result,message:'Successfully signed up'});
                })
                .catch(err=>{
                    res.json({newUserDetail:err})
                    console.log(err)})
            })
        }
    })
}