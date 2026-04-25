import { NextFunction, Request, Response } from "express"

const clientRequests = new Map<string, { count: number, startTime: number }>()

export const rateLimit = (maxRequests: number, windowMs: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip

        if (!ip) {
            next()
            return
        }

        const rateLimitInfo = clientRequests.get(ip)

        if (!rateLimitInfo || Date.now() - rateLimitInfo.startTime > windowMs) {
            clientRequests.set(ip, { count: 1, startTime: Date.now() })

            next()
        } else if (rateLimitInfo.count <= maxRequests) {
            clientRequests.set(ip, { count: rateLimitInfo.count + 1, startTime: rateLimitInfo.startTime })

            next()
        } else if (rateLimitInfo.count > maxRequests) {
            return res.status(429).json({ message: 'To many requests, try again later.' })
        }
    }
}