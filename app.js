const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const userRoutes=require('./routes/user')
const messageRoutes=require('./routes/message')
const sequelize=require('./util/database');
const User = require('./models/user');
const Message = require('./models/message');
const app=express();
app.use(cors({
    origin:'http://192.168.1.100:5500'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRoutes)
app.use(messageRoutes);

User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err))