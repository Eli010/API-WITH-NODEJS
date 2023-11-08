
export const registerController = (req,res)=>{
    console.log(req.body);
    res.json({ok:true});
}

export const loginController = (req,res)=>{
    res.json({ok:'login'});
}