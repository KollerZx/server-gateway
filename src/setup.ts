import dotenv from 'dotenv'
dotenv.config()

export const acenoUrl = String(process.env.acenoUrl)
export const acenoEndpoint = String(process.env.acenoEndpoint)
export const httpPort = Number(process.env.httpPort)
export const host = String(process.env.host)
export const SECRET = String(process.env.SECRET)
export const DEFAULT_LOG = 0
export const DETAILED_LOG = 1
export const DEBUG_LOG = 2
