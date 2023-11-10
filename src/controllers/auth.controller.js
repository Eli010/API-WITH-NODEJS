import { User } from '../models/user.js'

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
        return res.json({ ok: 'Register' });
    } catch (error) {
        console.log(error);
        //Alternativa TWO: error pode defecto mongoose
        if (error.code === 11000) {
            return res.status(401).json({error:"Ya existe el usuario"});
        }
    }

}

export const loginController = (req, res) => {
    res.json({ ok: 'login' });
}