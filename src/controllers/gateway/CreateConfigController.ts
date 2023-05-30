import { ConfigGateway } from "@prisma/client"
import { Gateway } from "../../entities/gateway"
import { FastifyReply, FastifyRequest } from "fastify"

export async function CreateConfigController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { serialPort, description, uid, logLevel, integration, apiKey, clientApiUrl, readQueueInterval, wsConnection, item, queue } = req.body as ConfigGateway

    const gateway = await Gateway.create({ serialPort, description, uid, logLevel, integration, apiKey, clientApiUrl, readQueueInterval, wsConnection, queue, item })
    reply.send(gateway)
  } catch (error: any) {
    reply.log.error(error)
    reply.status(500).send({ error: error?.message })
  }
}