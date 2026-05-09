import { Router } from 'express'
import { createPost, deletePost, getAllPosts, getPostById } from '../controllers/post.controller'

const postRouter = Router()

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: 
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error trying to get posts
 */
postRouter.get('/', getAllPosts)

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get one post by ID
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the post to retrieve
 *          schema:
 *              type: string
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Post
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Post'
 *       404:
 *          description: Post not found
 */
postRouter.get('/:id', getPostById)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PostInput'
 *     tags: [Posts]
 *     responses:
 *       202:
 *         description: Post creation queued
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Post'
 *       500:
 *          description: Error trying to create post
 */
postRouter.post('/', createPost)

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete one post by ID
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the post to delete
 *          schema:
 *              type: string
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Post
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Post'
 *       500:
 *          description: Error trying to delete post
 */
postRouter.delete('/:id', deletePost)

export default postRouter



