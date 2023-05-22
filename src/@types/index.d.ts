import { ConfigGateway } from '.';
import * as fastify from 'fastify'
import { FastifyInstance } from 'fastify'
import * as http from 'node:http'

declare module 'fastify' {
  export interface FastifyInstance extends FastifyInstance<
    > {
    authenticate: any
  }
}

export type ConfigGateway = {
  serialPort: string
  logLevel: number // 0: normal, 1: detailed, 2: debug,
  apiUrl?: string
  endpoint?: string
  clientApiUrl: string | null
  integration: boolean
  apiKey: string | null //https://api.dev.aceno.com/extcalls/key/register
  wsConnection: boolean
  readQueueInterval?: number
  httpPort?:number
  host?:string
}

export type GatewayResponse = {
  cmd: number,
  payload: {
    [key:string]: any
  }
}

export type QueueResponse = {
  ticket: number,
  created: boolean,
  removed: boolean
}