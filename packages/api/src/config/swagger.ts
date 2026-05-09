import swaggerJsdoc from 'swagger-jsdoc'

export let openapiSpecifications: object

const initializeSwagger = () => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Resilent-API',
                version: '1.0.0',
                description: 'Resilient API monorepo with simulations'
            },
            servers: [
                {
                    url: process.env.LOCAL_HOST,
                    description: 'Development Server'
                }
            ],
            components: {
                schemas: {
                    Post: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            body: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' }
                        }
                    },
                    PostInput: {
                        type: 'object',
                        required: ['title', 'body'],
                        properties: {
                            title: { type: 'string' },
                            body: { type: 'string' }
                        }
                    }
                }
            },
        },
        apis: ['./src/routes/*.ts', './src/controllers/*.ts']
    }
    
    openapiSpecifications = swaggerJsdoc(options)
}

export default initializeSwagger