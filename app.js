const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const userRoutes=require('./routes/user')
const sequelize=require('./util/database')
const app=express();
app.use(cors({
    origin:'http://192.168.0.103:5500'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRoutes)

sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err))