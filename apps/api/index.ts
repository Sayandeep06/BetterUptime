import express from 'express'
import { websiteRouter } from './routes/website';
import cors from 'cors'
import { statusRouter } from './routes/status';
import { userRouter } from './routes/user';

const app = express();
app.use(cors())
app.use(express.json())

app.use('/website', websiteRouter);
app.use('/status', statusRouter);
app.use('/user', userRouter);

app.listen(3001)