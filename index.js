import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { limiter } from './middlewares/rateLimiter.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';


import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'
import taskRoutes from './routes/tasks.js'



import { logger } from "./middlewares/logger.js"
import { notFound } from "./middlewares/notfound.js"
import { errorHandler } from "./middlewares/errorHandler.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


app.use(helmet())
app.use(express.json())
app.use(cors({
    origin: ['https://yourfrontend.com']
}));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(limiter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// custom middlewares    
app.use(logger)

//routes 
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)
app.use("/upload", uploadRoutes)
app.use("/tasks", taskRoutes)


// marwalbo route hoostiisa dhig
app.use(notFound);
// errore handler marwalbo last ayaa ladhigaa
app.use(errorHandler);



//connect to mongodb
const dbURI = process.env.MONGO_URI_PRO || process.env.MONGO_URI || process.env.MONGO_URI_DEV;

mongoose.connect(dbURI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ Connection error:', err));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})