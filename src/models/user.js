import {Schema,model} from "mongoose";
//importamos la libreria para la encriptación
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        index:{unique:true},
    },
    password:{
        type:String,
        required:true,
    }
});
//hasheamos nuestra contraseña
userSchema.pre("save", async function(next){
    const user = this
    if (!user.isModified('password'))return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password,salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("fallo el hash de la contraseña");
    }
});

userSchema.methods.comparePassword = async function(candidatePasssoword){
    return await bcryptjs.compare(candidatePasssoword,this.password);
};
export const User = model('User',userSchema);