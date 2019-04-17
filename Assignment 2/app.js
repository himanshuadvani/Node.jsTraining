const express=require("express");
const routes=require('./routes');
const app=express();



require('dotenv').config();

var logger= (req,res,next)=>
{

    console.log("Inside Log");
    next();
}


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('shared'));



const students=[
    {id:1,fullname:"Himanshu Advani",academic_year:"SE",branch:"Computer Engineering",email:"adwani708@gmail.com",contact:9049660656},
    {id:2,fullname:"Prafulla Joshi",academic_year:"TE",branch:"IT Engineering",email:"joshiprafulla21@gmail.com",contact:9730084300},
    {id:3,fullname:"Deepak Vezer",academic_year:"SE",branch:"Computer Engineering",email:"deepakvezer@gmail.com",contact:9049287776},
    {id:4,fullname:"Kashinath Raut",academic_year:"BE",branch:"IT Engineering",email:"kashinath.raut@gmail.com",contact:9922828483}
    
]

app.use(logger);
app.use('/',routes);


port=process.env.PORT || 5300;
app.listen(port,() => console.log("Server started at port "+port));

