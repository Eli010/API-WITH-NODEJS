import {validationResult} from "express-validator";
export const  validatorResult = (req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
      }
    

    next();
}