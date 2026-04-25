import { NextFunction, Request, Response } from "express"

export const intermitentFaults = (failureRate: number) => {
    return (_: Request, res: Response, next: NextFunction) => {
        const randomFailureRate = Math.random()

        if (randomFailureRate >= failureRate) {
            return next()
        } else {
            return res.status(500).json({ message: 'Service failed, try again later.' })
        }
    }
}