const Joi = require("joi");

const registrationValidation = Joi.object({
    Username: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(50).required(),
    confirmPassword: Joi.string().required(),
    
         residence: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),   
    gender: Joi.string()
        .valid("Male", "Female", "Other")
        .insensitive()    
        .trim()       
        .required(),
     role:Joi.string().valid("user","admin").required(),
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(50),
    remember: Joi.boolean()                                   
  });
  const reportsValidation = Joi.object({
    incidentType: Joi.string().valid("theft","vandalism","suspicious activity","other").required(),
    description: Joi.string().required(),
    severity: Joi.string().valid("low","medium","high").required(),  
    location: Joi.string(),
    media: Joi.string().required() ,
    anonymous: Joi.boolean()                                   
  });                             
  
  const addUservalidation = Joi.object({
    Username: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(50).required(),
    confirmPassword: Joi.string().required(),
 
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
    residence: Joi.string().required(),
    role:Joi.string().valid("user","doctor","admin"),
    gender: Joi.string()
        .valid("Male", "Female", "Other")
        .insensitive() 
        .trim() 
        .required()
}).unknown(true);

  

module.exports = { registrationValidation,loginValidation,reportsValidation,addUservalidation };           