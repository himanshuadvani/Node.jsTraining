var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

var userSchema=new mongoose.Schema(
    {
        name:String,
        age:Number
    }
)

var User=mongoose.model('User',userSchema);

var user1=new User({name: "Himanshu Advani",age:22});

    
user1.save((err,user) =>
{
    if(err)
        console.log(err);
    else  
        console.log("User inserted..."+user);
});

User.findByIdAndDelete('5caed99c4b2f57570482f94e',(err,succ)=>
{
    if(err)
        console.log(err);
    else  
    console.log(succ);
});


User.findByIdAndUpdate('5caee0827cb950658c4021d3',{name:"HIMANSHU Advani"},{new:true},(err,succ)=>
{
    if(err)
        console.log(err);
    else  
    console.log(succ);
});


User.find((err,user)=> 
{
    if(err)
        console.log(err);
        else
            console.log(user);
});
