const mongoose=require('mongoose');
const joi=require('joi');


/**
 * @author Himanshu Advani
 * mongoose schema of student along with all the necessary validations
 */

const student=new mongoose.Schema(
  {
    fullname: {type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    address: {
      type: String,
      minlength: 16,
      maxlength: 100,
    },
    dob: {
      type: Date,
      required: true,
      max: '1998-01-01',
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{10}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`,
      },

    },
    branch: {
      type: String,
      required: true,
      enum: ['Computer', 'IT', 'E&TC'],
    },
    academic_year: {
      type: String,
      required: true,
      enum: ['FE', 'SE', 'TE', 'BE'],
    },
    subjects: [{
      type: Object,
      required: true,
    }],

    isOutsider: {
      type: Boolean,
    },

  }
);


/**
 * @author Himanshu Advani
 * joi schema of student along with all the necessary validations
 */

const joiSchema={
  fullname: joi.string().min(3).required(),
  address: joi.string().min(16).max(100).required(),
  dob: joi.date().max('1998-01-01').required(),
  email: joi.string().email({minDomainAtoms: 2}),
  contact: joi.string().regex(/\d{10}/).required(),
  academic_year: joi.string().valid('FE', 'SE', 'TE', 'BE').required(),
  branch: joi.string().valid('IT', 'Computer', 'E&TC').required(),
  subjects: joi.required(),
  isOutsider: joi.required(),
};

module.exports.student=student;
module.exports.joiSchema=joiSchema;
