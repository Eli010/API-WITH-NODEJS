import {validationResult }  from "express-validator";
export const registerController = (req,res)=>{
    console.log(req.body);

     res.json({ok:'Register'});
}

export const loginController = (req,res)=>{
    res.json({ok:'login'});
}