import {Router} from "express";
import { body } from "express-validator";
import { loginController, registerController } from '../controllers/auth.controller.js'
import { validatorResult } from "../middlewares/validatorResult.js";
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

export default router;