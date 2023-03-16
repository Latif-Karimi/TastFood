const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt =  require ("bcryptjs");
const jwt = require ("jsonwebtoken")
const jwtSecret = "janjonjanajan123"

router.post("/creatuser",[
 body('email', 'Incorrect Email').isEmail(),
 body('name').isLength({ min: 5 }),
body('password', 'Incorrect Password').isLength({ min: 5 })]
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let securPassword = await bcrypt.hash(req.body.password,salt)

    try {
       await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securPassword,
            location: req.body.location 
        })
        res.json({success:true})
    } catch (error) {
        console.error(error.message)
        res.json({success:false})
    }
}) 

router.post("/login",[
    body('email', 'Incorrect Email').isEmail(),
   body('password', 'Incorrect Password').isLength({ min: 5 })]
   ,async (req,res)=>{
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }

       let email = req.body.email;
       try {
          let userData = await User.findOne({email})
          if(!userData){
            return res.status(400).json({ errors:"loggin with correct credentials"});
          }
          const passCompaire = await bcrypt.compare(req.body.password,userData.password)
          if(!passCompaire){
            return res.status(400).json({ errors:"loggin with correct credentials"});
          }
          const data = {
            user:{
              id:userData.id
            }
          }
          const authToken =jwt.sign(data,jwtSecret)
           return res.json({success:true,authToken:authToken})
       } catch (error) {
           console.error(error.message)
           res.json({success:false})
       }
   }) 
   
module.exports= router;