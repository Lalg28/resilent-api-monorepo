import { createClient, RedisClientType } from 'redis';

export const CACHE_TTL = 900 //15 minutes

export let redisClient: RedisClientType
export let redisURL: URL

const initializeRedis = () => {
    const REDIS_URI = process.env.REDIS_URI || ''
    redisURL = new URL(REDIS_URI)

    redisClient = createClient({
        url: REDIS_URI
    })

    redisClient.connect()

    redisClient.on('connect', () => {
        console.log('🟥 Redis connected successfully...')
    })
}

export default initializeRedis