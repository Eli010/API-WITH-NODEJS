//importamos la libreria para nuestro variable entorno
import 'dotenv/config';
//importamos el archivo que nos ayudara a conecta a nuestra db
import "./src/config/conectdb.js"
import express from 'express';
import authRouter from './src/routes/auth.route.js'

const app = express();

//agregamos en uso de json
app.use(express.json());
//rutas
app.use('/api/v1/auth',authRouter);

const PORT = process.env.PORT||5000;

//escuchos desde mi servidor
app.listen(PORT, ()=> console.log("✨ http://localhost:"+PORT));