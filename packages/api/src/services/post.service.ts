import { IPost } from '@resilient/shared'
import Post from '../models/post.model'
import { CACHE_TTL, redisClient } from '../config/redis'

export async function getAllPostsService() {
    const postsFromCache = await redisClient.get('posts:all')

    if (postsFromCache) {
        return JSON.parse(postsFromCache)
    }

    const posts = await Post.find({})

    await redisClient.set('posts:all', JSON.stringify(posts), { EX: CACHE_TTL })

    return posts
}

export async function getPostByIdService(id: string) {
    const postFromCache = await redisClient.get(`posts:${id}`)

    if (postFromCache) {
        return JSON.parse(postFromCache)
    }

    const post = await Post.findById(id)

    await redisClient.set(`posts:${id}`, JSON.stringify(post), { EX: CACHE_TTL })

    return post
}

export async function createPostService(payload: IPost) {
    const postCreated = await Post.create(payload)

    // Invalidate cache
    await redisClient.del('posts:all')

    return postCreated
}

export async function deletePostService(id: string) {
    const postDeleted = await Post.findByIdAndDelete(id)

    // Invalidate cache
    await redisClient.del('posts:all')
    await redisClient.del(`posts:${id}`)

    return postDeleted
}