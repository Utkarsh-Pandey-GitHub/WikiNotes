import express, { Request, Response,NextFunction, Application } from 'express'
import { Server } from 'http'
import router from './routes'
import main from './connection'
import cors from 'cors'
import bodyParser from 'body-parser'

main()
.then(()=>{
    console.log("connected to mongodb successfully");
    
})
.catch((err)=>{
    console.log(err);
    
})
const app: Application = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/routes',router)






const server: Server = app.listen(3001, (): void => {
    console.log('initializing...');

})