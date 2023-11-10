import { User } from '../models/user.js';
import jwt  from 'jsonwebtoken';
import { generateToken } from '../utils/tokenManager.js';

export const registerController = async (req, res) => {
    console.log(req.body);
    //desestructuramos 
    const { email, password } = req.body;
    try {

        //Alternativa ONE: validación por busqueda de email
        //buscamos al usuario antes de guardar
       let user =  await User.findOne({ email });
        //comparamos si existe o no
        if (user) throw {code:11000}

         user =  User({ email, password });
        await user.save();

        //JWT TOKEN

        return res.status(201).json({ ok: 'Register' });
    } catch (error) {
        console.log(error);
        //Alternativa TWO: error pode defecto mongoose
        if (error.code === 11000) {
            return res.status(401).json({error:"Ya existe el usuario"});
        }
        return res.status(500).json({error:"Error de servidor"});
    }

}

export const loginController =async (req, res) => {
    try {
     const { email, password } = req.body;

     let user =  await User.findOne({ email });
     if (!user) return res.status(403).json({error:"No existe este usuario"});

     const verificarPassword = await user.comparePassword(password);
     if (!verificarPassword) 
     return res.status(403).json({error:"contraseña incorrecta"});
    
     //generamos un token
        // const token =  jwt.sign({uid:user._id},process.env.JWT_SECRET);
        const {token,expiresIn} =  generateToken(user.id);


       return res.json({ token,expiresIn });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Error de servidor"});
    }
}

export const infoUser = async (req,res)=>{
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({email:user.email,uid:user.id});
    } catch (error) {
        return res.status(500).json({error:"error de server"})
    }
}