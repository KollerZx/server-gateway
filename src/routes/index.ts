import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { User, UserCreate } from '../entities/user'
import { Gateway } from '../entities/gateway'
import { ConfigGateway } from '../@types'
import { CreateConfigController } from '../controllers/gateway/CreateConfigController'

async function routes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.get("/", async (request, reply) => {
    reply.send({ message: "Hello World" })
  })

  fastify.post('/user/register', async (request, reply) => {
    try {
      const { username, password } = request.body as UserCreate
      const user = await User.create({ username, password })
      reply.status(201).send(user)
    } catch (error: any) {
      reply.log.error(error)
      reply.status(500).send({ error: error?.message })
    }
  })

  fastify.put('/user/update/:id', async (request, reply) => {
    try {
      const { id } = request.params as any
      const { username, password } = request.body as UserCreate
      const user = await User.update(Number(id), { username, password })
      reply.status(201).send(user)
    } catch (error: any) {
      reply.log.error(error)
      reply.status(500).send({ error: error?.message })
    }
  })

  fastify.post("/config", { onRequest: fastify.authenticate }, CreateConfigController)

  fastify.get("/config", { onRequest: fastify.authenticate }, async (request, reply) => {
    const configs = await Gateway.findAll()
    reply.send({ configs })
  })

  fastify.put("/config/:id", { onRequest: fastify.authenticate, }, async (request, reply) => {
    try {
      const { id } = request.params as any
      const { serialPort, logLevel, description, integration, apiKey, clientApiUrl, readQueueInterval, wsConnection, queue, item, uid } = request.body as Partial<ConfigGateway>
      const config = await Gateway.update(Number(id), { serialPort, description, logLevel, integration, apiKey, clientApiUrl, readQueueInterval, wsConnection, queue, item, uid })
      reply.send(config)
    } catch (error: any) {
      reply.log.error(error)
      reply.status(500).send({ error: error?.message })
    }

  })
}

export default fp(routes)