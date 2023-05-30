import { ConfigGateway } from '.';
import * as fastify from 'fastify'
import { FastifyInstance } from 'fastify'
import * as http from 'node:http'
import { EventEmitter } from 'node:stream';
import { SerialFrameParser } from '../modules/serial/Framer';
import { SendRequest } from '../modules/request/SendRequest';
import { Socket } from 'socket.io-client';
import { QueueEvents } from '../modules/serial/QueueEvents';

declare module 'fastify' {
  export interface FastifyInstance extends FastifyInstance<
    > {
    authenticate: any
  }
}

export type ConfigGateway = {
  serialPort: string
  description: string
  queue: string
  item: string
  logLevel: number // 0: normal, 1: detailed, 2: debug,
  apiUrl?: string
  uid?: string
  endpoint?: string
  clientApiUrl: string | null
  integration: boolean
  apiKey: string | null //https://api.dev.aceno.com/extcalls/key/register
  wsConnection: boolean
  readQueueInterval: number
  httpPort?: number
  host?: string
}

export type GatewayResponse = {
  cmd: number,
  payload: {
    [key: string]: any
  }
}

export type QueueResponse = {
  ticket: number,
  created: boolean,
  removed: boolean
}

export type CreateTicket = {
  queue_id: string
  item_id: string
  title: string
}

export interface HandleQueueReading {
  // data: Generator<GatewayResponse, boolean | undefined, unknown> | null,
  frameParser: SerialFrameParser
  frame: Buffer
  currentQueue: Set<number>,
  config: ConfigGateway
}

export interface HandleDoneQueueRead {
  queueEvent: EventEmitter
  previousQueue: Set<number>
  currentQueue: Set<number>
}

export interface HandleQueueEmpty {
  queueEvent: EventEmitter
  currentQueue: Set<number>
  previousQueue: Set<number>
  Request?: SendRequest
}

export interface HandleQueueEvents {
  item: Set<number>
  currentQueue: Set<number>
  previousQueue: Set<number>
  Request?: SendRequest
  socket?: Socket
  config: ConfigGateway
}

export type PortInfo = {
  port: string
  manufacturer: string | undefined
  serialNumber: string | undefined
  pnpId: string
}

export type DeviceInstance = {
  [key in string]: {
    queueEvent: QueueEvents
    frameParser: SerialFrameParser
  }
}

export type AllowCodesByDevice = {
  [key in string]: {
    allowCodes: number[]
  }
}