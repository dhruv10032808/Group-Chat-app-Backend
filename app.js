const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const userRoutes=require('./routes/user')
const messageRoutes=require('./routes/message')
const groupRoutes=require('./routes/group')
const sequelize=require('./util/database');
const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const GroupUser = require('./models/usergroup');
const app=express();
app.use(cors({
    origin:'http://192.168.1.102:5500'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRoutes)
app.use(messageRoutes);
app.use(groupRoutes)

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

Group.belongsToMany(User,{through:GroupUser})
User.belongsToMany(Group,{through:GroupUser})

sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err))