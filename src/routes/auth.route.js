import {Router} from "express";
import { body } from "express-validator";
import { infoUser, loginController, registerController } from '../controllers/auth.controller.js'
import { validatorResult } from "../middlewares/validatorResult.js";
import { requireUserToken } from "../middlewares/requireUserToken.js";
const router = Router();

router.post('/register',
    [
        body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
        body('password', "formato de password incorrecto").trim().isLength({ min: 6 })
    ],
    validatorResult
    , registerController);
router.post('/login',
[
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "formato de password incorrecto").trim().isLength({ min: 6 })
],
validatorResult,
 loginController);

 router.get('/protected', requireUserToken, infoUser);
export default router;