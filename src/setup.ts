import dotenv from 'dotenv'
dotenv.config()

import { ConfigGateway } from './@types';


export const CONFIG: ConfigGateway = {
  serialPort: String(process.env.serialPort),
  apiUrl: String(process.env.apiUrl),
  endpoint:String(process.env.endpoint),
  apiKey: String(process.env.apiKey),
  clientApiUrl: String(process.env.clientApiUrl),
  logLevel: Number(process.env.logLevel),
  integration: !!Number(process.env.integration), // 0: false, 1: true
  readQueueInterval: Number(process.env.readQueueInterval),
  wsConnection: !!Number(process.env.wsConnection), // 0: false, 1: true
  httpPort: Number(process.env.httpPort),
  host: String(process.env.host)
}

export const acenoUrl = String(process.env.acenoUrl)
export const acenoEndpoint = String(process.env.acenoEndpoint)

export const SECRET = String(process.env.SECRET)
export const DEFAULT_LOG = 0
export const DETAILED_LOG = 1
export const DEBUG_LOG = 2
