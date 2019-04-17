const routes=require('express').Router();
const joi=require("joi");


const students=[
    {id:1,fullname:"Himanshu Advani",academic_year:"SE",branch:"Computer Engineering",email:"adwani708@gmail.com",contact:9049660656},
    {id:2,fullname:"Prafulla Joshi",academic_year:"TE",branch:"IT Engineering",email:"joshiprafulla21@gmail.com",contact:9730084300},
    {id:3,fullname:"Deepak Vezer",academic_year:"SE",branch:"Computer Engineering",email:"deepakvezer@gmail.com",contact:9049287776},
    {id:4,fullname:"Kashinath Raut",academic_year:"BE",branch:"IT Engineering",email:"kashinath.raut@gmail.com",contact:9922828483}
    
]



/**
 * @author: Himanshu Advani
 * Get all students
 
*/
routes.get('/',(req,res)=>
{
    console.log("Inside students");
    res.send(students)
})


routes.get('/students',(req,res)=>
{
    res.send(students)
})

/**
 * @author: Himanshu Advani
 * To Get particular student by id
*/

routes.get('/students/:id',(req,res)=>
{
    // get id from url param
    let id=parseInt(req.params.id);
    let student=students.find((s=> s.id===id) );
    if(!student)
    {
        //if student is not present
        return res.status(404).send(`Student with id ${id} is not available`);
    }

    res.send(student)

})



/**
 * @author: Himanshu Advani
 * To add a student 
*/

routes.post('/students',(req,res)=>{
    //convert contact from string to number
    req.body.contact=parseInt(req.body.contact)

    //schema to validate input against

    const {error}=check(req.body)
     if(error) {
         return res.status(400).send(error.message);
     }

     let student={
         id:students.length+1,
         fullname:req.body.fullname,
         academic_year:req.body.academic_year,
         branch:req.body.branch,
         email:req.body.email,
         contact:req.body.contact
     }

     students.push(student);
     res.send(student);


})


/**
 * @author: Himanshu Advani
 * To update a student by id
*/


routes.put('/students/:id',(req,res)=>{

      //convert contact from string to number
    req.body.contact=parseInt(req.body.contact)

    //convert id to int and find student by id
    let id=parseInt(req.params.id);
    let student=students.find((s => s.id===id) );
    if(!student) 
    {
        return res.status(404).send(`Student with id ${id} is not available`);
    }
    //schema to validate input against
    
     const {error}=check(req.body)
     if(error) {
         return res.status(400).send(error.message);
     }

     student.fullname=req.body.fullname;
     student.academic_year=req.body.year;
     student.branch=req.body.branch;
     student.email=req.body.email;
     student.contact=req.body.contact;


   
     res.send(student);


})


/**
 * @author: Himanshu Advani
 * To delete a student by id
*/


routes.delete('/students/:id',(req,res)=>{

  //convert id to int and find student by id
  let id=parseInt(req.params.id);
  let student=students.find((s => s.id===id) );
  if(!student) 
  {
      return res.status(404).send(`Student with id ${id} is not available`);
  }

 // splice() method removes element from arrays 
  students.splice(students.indexOf(student),1);
   res.send(student);


})


function check(data)
{
    const schema={
        fullname:joi.string().min(4).required(),
        academic_year:joi.string().required(),
        branch:joi.string().required(),
        email:joi.string().email({ minDomainAtoms: 2 }),
        contact:joi.number().integer().required()
    }

    return joi.validate(data,schema);
    

}

module.exports=routes;