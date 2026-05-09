import express from 'express';
import dotenv from 'dotenv';
import initializeMongo from './config/db'
import postRouter from './routes/post.routes';
import { rateLimit } from './middleware/rateLimit';
import { latency } from './middleware/latency';
import { intermitentFaults } from './middleware/intermittentFaults';
import initializeRedis from './config/redis';
import { initializeQueue } from './queues/post.queue';
import { initializeWorker } from './queues/post.worker';
import swaggerUI from 'swagger-ui-express'
import initializeSwagger, { openapiSpecifications } from './config/swagger';

dotenv.config();

const PORT = process.env.PORT || 3000;

initializeMongo()

initializeRedis()

initializeSwagger()

initializeQueue()

initializeWorker()

const app = express();

app.use(express.json())

// app.use(rateLimit(3, 60000))

// Apply fake latency for test porposes
// app.use(latency(1000, 5000))

// app.use(intermitentFaults(0.3))

app.use('/posts', postRouter)

app.get('/health', (_, res: express.Response) => {
    res.json({ status: 'ok' })
})

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecifications))

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})