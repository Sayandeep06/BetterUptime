import express from 'express'
import { websiteRouter } from './routes/website';
import cors from 'cors'
import { statusRouter } from './routes/status';
const app = express();
app.use(cors())

app.use('/website', websiteRouter);
app.use('/status', statusRouter);