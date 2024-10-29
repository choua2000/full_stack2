import express,{Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes';
import connectDB from './configs/db';
dotenv.config();
const PORT = process.env.PORT || 5000;
import bodyParser from 'body-parser';
 const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use("/api", router);    
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})