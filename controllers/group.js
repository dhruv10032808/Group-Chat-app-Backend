const Chatimage = require('../models/chatimage')
const Group=require('../models/group')
const Message = require('../models/message')
const User = require('../models/user')
const GroupUser = require('../models/usergroup')

exports.creategroup=(req,res,next)=>{
    Group.create({
        groupname:req.body.group,
        groupadmin:req.user.id
    }).then((group)=>{
        GroupUser.create({
            isadmin:true,
            userId:req.user.id,
            groupId:group.id
        }).then(()=>{
            res.status(201).json({message:'Group created',success:true})
        })
    }).catch(err=>console.log(err))
}

exports.getgroup=(req,res,next)=>{
    Group.findAll({
        attributes:['groupname','id','groupadmin'],
        include:[
            {
            model:User,
            where:{id:req.user.id}
            }
        ]
    }).then(group=>{
        res.status(201).json({group:group,success:true})
    }).catch(err=>console.log(err))
}

exports.getgroupmessage=(req,res,next)=>{
    const groupid=req.query.gid;
    Message.findAll({
        attributes:['message','id'],
        include:[{
            model:User,
            attributes:['name']
        }],
        where:{groupId:groupid}
    }).then(message=>{
        res.status(201).json({message:message});
    }).catch(err=>console.log(err));
}

exports.joingroup=async (req,res)=>{
    const {email,gid}=req.body;
    const grp_admin=await GroupUser.findOne(
        {attributes:['isadmin'],
        where:{groupId:gid,userId:req.user.id}});
        console.log(grp_admin.isadmin)
        if(grp_admin.isadmin==1){
            const mem_id=await User.findOne(
                {
                where:{email:email}}); 
                console.log(mem_id);
                if(mem_id!=null){
                 const mem_already=await GroupUser.findOne({
                    where:{userId:mem_id.id, groupId:gid}
                 }); 
                 if (mem_already!=null){
                  res.json({message:"User is already a member of this group",success:false});
              }
                if(mem_id.id){

                      await GroupUser.create({isadmin:0,userId:mem_id.id, groupId:gid})
                      .then(()=>{
                        res.status(201).json({message:"successfully added new member",success:true});
                      })
                  }

            }

              else{
            res.json({message:"No such user exists to add to group", success:false});
            }
        }
        else{
            res.json({message:"You are not admin of group to add members"})
          }
}

exports.getgroupuser=(req,res)=>{
    const groupid=req.params.id
    Group.findAll({
        include:User,
        where:{id:groupid}
    }).then(users=>{
        GroupUser.findOne({where:{userId:req.user.id,groupId:groupid}}).then(groupuser=>{
            res.status(201).json({user:users,isadmin:groupuser.isadmin,success:true})
        })
    })
}

exports.removefromgroup=(req,res)=>{
    const userId=req.params.userId;
    const gid=req.params.gid;
    GroupUser.findOne({
        where:{userId:userId,groupId:gid}
    }).then(user=>{
        user.destroy().then(()=>{
            res.status(201).json({message:'User deleted from group',success:true})
        })
    })
}

exports.makeadmin=(req,res)=>{
    const userId=req.params.userId;
    const gid=req.params.gid;
    GroupUser.findOne({
        where:{userId:userId,groupId:gid}
    }).then(user=>{
        user.update({
            isadmin:true
        }).then(()=>{
            res.status(201).json({message:'The user is now admin',success:true})
        })
    })
}

exports.chatimage=(req,res)=>{
    const groupid=req.body.groupid;
    const picture=req.body.picture;
    Chatimage.create({
        image:picture,
        userId:req.user.id,
        groupId:groupid
    }).then(()=>{
        res.status(201).json({message:'Image sent successfully'})
    }).catch(err=>console.log(err))
}