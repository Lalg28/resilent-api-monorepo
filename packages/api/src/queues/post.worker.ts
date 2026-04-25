import { Worker } from "bullmq";
import { createPostService } from "../services/post.service";
import { redisURL } from "../config/redis";

export let postWorker: Worker

export const initializeWorker = () => {
    postWorker = new Worker('post-creation', async job => {
        if (job.name === 'createPost') {
            await createPostService(job.data.payload)
        }
    }, {
        connection: {
            host: redisURL.hostname || 'localhost',
            port: parseInt(redisURL.port || '6379', 10)
        }
    })
}