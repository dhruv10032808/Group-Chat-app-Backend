const User=require('../models/user');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.signup=(req,res,next)=>{
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

    const getAccessToken=(id)=>{
        return jwt.sign({userId:id},'kufihwqfjiwhihinf984765gbemd')
        }

    exports.login=(req,res,next)=>{
        User.findAll({where:{email:req.body.email}}).then(users=>{
            if(users.length>0){
                bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
                    if(err){
                        throw new Error('Something went wrong');
                    }
                    if(result===true){
                        res.status(200).json({success:true,message:'User logged in successfully',token:getAccessToken(users[0].id),name:users[0].name})
                    }else{
                        return res.status(400).json({success:false,message:'Password is incorrect'})
                    }
                })
            }else{
                res.json(404).json({success:false,message:'User does not exist'})
            }
        })
        .catch(err=>{
            res.status(500).json({success:false,message:err})
        })
    }