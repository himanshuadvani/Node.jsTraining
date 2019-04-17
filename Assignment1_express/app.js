var express=require("express");
var app=express();
app.use(express.json());

var users=[
    {id:1,name:"Himanshu Advani"},
    {id:2,name:"Prafulla Joshi"},
    {id:3,name:"Ganesh Jadhav"},
    {id:4,name:"Kashinath Raut"}

]

app.listen(5000,() => console.log("Server started at port 5000"));


app.get('/',(req,res) =>
{
    res.send(users);
});

app.get('/users',function(req,res)
{
    res.send(users);
});

app.get('/users/:id',(req,res) =>
{
    var user=users.find(temp =>parseInt(req.params.id) == temp.id);
    res.send(user);

});


app.post('/users',(req,res) => 
{
var user={
    id:users.length+1,
    name:req.body.name
}

users.push(user);
res.send(user);
});



app.put('/users/:id',(req,res) =>
{
    var user=users.find(temp =>parseInt(req.params.id) == temp.id);
    if(!user) res.status(404).send("Invalid Id...");

    user.name=req.body.name;
    res.status(200).send(user);
    

});

app.delete('/users/:id',(req,res) =>
{

    var user=users.find(temp =>parseInt(req.params.id) == temp.id);
    if(!user) res.status(404).send("Invalid Id...");

    var index=users.indexOf(user);
    users.splice(index,1);

    res.send(user);

});