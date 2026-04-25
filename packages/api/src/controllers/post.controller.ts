import { Request, Response } from 'express'
import { createPostService, deletePostService, getAllPostsService, getPostByIdService } from '../services/post.service'
import { postQueue } from '../queues/post.queue'

export const getAllPosts = async (_: Request, res: Response) => {
    try {
        const posts = await getAllPostsService()

        return res.status(200).json({
            data: posts
        })
    } catch (error) {
        console.error('Error trying to get all posts', error)

        return res.status(500).json({ message: 'Error trying to get posts' })
    }
}

export const getPostById = async (req: Request, res: Response) => {
    const postId = req.params.id as string

    try {
        const post = await getPostByIdService(postId)

        if (!post) return res.status(404).json({ message: `Post with ID ${postId} not found` })

        return res.status(200).json({
            data: post
        })
    } catch (error) {
        console.error(`Error trying to get the post with ID: ${postId}`, error)

        return res.status(500).json({ message: `Something went wrong` })
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const payload = req.body

        await postQueue.add('createPost', { payload: req.body })

        return res.status(202).json({
            message: "Post creation queued"
        })
    } catch (error) {
        console.error('Error trying to create Post', error)

        return res.status(500).json({ message: `Something went wrong` })
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id as string

    try {
        const postDeleted = await deletePostService(postId)

        if (!postDeleted) return res.status(404).json({ message: `Post with ID ${postId} not found` })

        return res.status(200).json({
            data: postDeleted
        })
    } catch (error) {
        console.error('Error trying to delete Post', error)

        return res.status(500).json({ message: `Something went wrong` })
    }
}