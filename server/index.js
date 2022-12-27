import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path" // already comes with node
import { fileURLToPath } from "url"

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config(); // so we can use dotenv files (for environment variables)

const app = express()
//all the middleware stuff
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))) //sets the directory of where we keep assets(in this case images)

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage }) //this variables wil be used when we want to upload a file

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`))
}).catch((error)=>{console.log("Error: did not connect")})