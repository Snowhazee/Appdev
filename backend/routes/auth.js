const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require('express');
const users = [];

exports.register = async (req,res)=>{

 const { email, password } = req.body;

 if(!email || !password){
   return res.status(400).json({message:"Missing fields"})
 }

 const hashedPassword = await bcrypt.hash(password,10);

 users.push({email,password:hashedPassword});

 res.json({message:"User registered"});
}

exports.login = async (req,res)=>{

 const { email, password } = req.body;

 const user = users.find(u => u.email === email);

 if(!user){
   return res.status(400).json({message:"User not found"})
 }

 const valid = await bcrypt.compare(password,user.password);

 if(!valid){
   return res.status(400).json({message:"Invalid password"})
 }

 const token = jwt.sign(
   {email:user.email},
   process.env.JWT_SECRET,
   {expiresIn:"1h"}
 );

 res.json({token});
}