import { NextFunction, Request, Response } from "express"

export const latency = (minMs: number, maxMs: number) => {
    return (_: Request, __: Response, next: NextFunction) => {
        const randomLatency = Math.floor(Math.random() * (maxMs - minMs + 1) + minMs)

        setTimeout(() => next(), randomLatency);
    }
}