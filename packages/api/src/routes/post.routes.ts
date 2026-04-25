import { Router } from 'express'
import { createPost, deletePost, getAllPosts, getPostById } from '../controllers/post.controller'

const postRouter = Router()

postRouter.get('/', getAllPosts)

postRouter.get('/:id', getPostById)

postRouter.post('/', createPost)

postRouter.delete('/:id', deletePost)

export default postRouter



