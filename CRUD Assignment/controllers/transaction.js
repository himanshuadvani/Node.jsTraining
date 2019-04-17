const express=require('express');
const joi=require('joi');
const app=express();
const studentSchema=require('../models/student');
const dbpath=require('../dbpath');

app.use(express.json());

const mongoose=require('mongoose');

mongoose.connect(dbpath.url.uri, {useNewUrlParser: true}, function(err) {
  if (err) console.log(err);
});

const Student=mongoose.model('Student', studentSchema.student);

/**
 * @author Himanshu Advani
 * Get all students from DB.
 * @return {object} all student objects from DB.
 */

exports.findAll= (req, res)=> {
  try {
    Student.find((err, user)=>{
      if (err) {
        throw err;
      } else {
        res.status(200).send(user);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * @author Himanshu Advani
 * Gets student from DB by ID.
 * @param {string} id student id is taken from request url.
 * @return {object} student object.
 */


exports.find=(req, res)=> {
  const id=req.params.id;
  try {
    Student.find({'_id': id}, (err, user)=> {
      if (err) {
        throw err;
      } else {
        res.status(200).send(user);
      }
    });
  } catch (e) {
    console.log(e);
  }
};


/**
 * @author Himanshu Advani
 * Adds new student in DB.
 * @param {object} student student details are taken from request body.
 * @return {object} student object which is created.
 */


exports.addStudent=(req, res)=>{
  const {error}=check(req.body);
  if (error) {
    return res.status(400).send(error.message);
  } else {
    try {
      const student1=new Student({
        fullname: req.body.fullname,
        address: req.body.address,
        dob: req.body.dob,
        email: req.body.email,
        contact: req.body.contact,
        branch: req.body.branch,
        academic_year: req.body.academic_year,
        subjects: req.body.subjects,
        isOutsider: req.body.isOutsider,
      });


      student1.save((err, stu)=> {
        if (err) {
          throw err;
        } else {
          console.log(stu);
          res.status(200).send(stu);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};


/**
 * @author Himanshu Advani
 * Update student by ID.
 * @param {object} student id and student details that need to be updated are
 * taken from request url and body.
 * @return {object} student object which is updated.
 */

exports.updateStudent=async (req, res)=>{
  const id=req.params.id;
  const {error}=check(req.body);
  if (error) {
    return res.status(400).send(error.message);
  } else {
    try {
      const result=await Student.findOneAndUpdate(
        {'_id': id}, req.body, {new: true});
      if (result) {
        console.log('Updated Student: '+result);
        res.status(200).send(result);
      } else {
        console.log('Failed to update...');
      }
    } catch (e) {
      console.log(e);
    }
  }
};


/**
 * @author Himanshu Advani
 * Delete student by ID.
 * @param {string} id id is takedn from request url.
 * @return {object} student object which is deleted.
 */

exports.deleteStudent=async (req, res)=>{
  const id=req.params.id;
  try {
    const result=await Student.findOneAndDelete({'_id': id});
    if (result) {
      console.log('Deleted Student: '+result);
      res.status(200).send(result);
    } else {
      console.log('Failed to delete...');
    }
  } catch (e) {
    console.log(e);
  }
};


/**
 * @author Himanshu Advani
 * Adds two numbers together.
 * @param {object} data request body.
 * @return {boolean} if schema validation.
 */
function check(data) {
  return joi.validate(data, studentSchema.joiSchema);
}

