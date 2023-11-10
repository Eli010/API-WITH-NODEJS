import jwt from "jsonwebtoken";
export const requireUserToken = (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if (!token) throw new Error('No existe el token en el eader usa Bearer');

        //realizamos una separación de beaber con el token
        token = token.split(" ")[1];
        //verificar token
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(payload);

        req.uid = uid;

        // console.log(req.headers);
        next();
    } catch (error) {
        console.log(error.message);
        const tokenVerificationErrors = {
            "invalid signature": "La firma del jwt no es valida",
            "jwt expired": "JWT expirado",
            "invalid token" : "Token no valido",
            "No Bearer": "Utiliza otro formato bearer",
        };
        return res
        .status(401).send({error:tokenVerificationErrors[error.message]})
    }
}