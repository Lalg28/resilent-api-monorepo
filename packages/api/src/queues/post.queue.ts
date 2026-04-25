import { Queue } from "bullmq";
import { redisURL } from "../config/redis";

export let postQueue: Queue

export const initializeQueue = () => {
    postQueue = new Queue('post-creation', {
        connection: {
            host: redisURL.hostname || 'localhost',
            port: parseInt(redisURL.port || '6379', 10)
        },
        defaultJobOptions: {
            attempts: 3,
            removeOnComplete: true
        }
    })
}

