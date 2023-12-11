import express, { Request, Response,NextFunction, Application } from 'express'
import { Server } from 'http'
import router from './routes'
import main from './connection'
import cors from 'cors'


main()
.then(()=>{
    console.log("connected to mongodb successfully");
    
})
const app: Application = express()
app.use(cors())
app.use('/routes',router)

app.get('/', (req: Request, res: Response): void => {
    res.json({ message: "Please Like the Video!" })
})




const server: Server = app.listen(3001, (): void => {
    console.log('rom rom sarea nu');

})