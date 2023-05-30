import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compare } from "bcrypt";
import { prisma } from "../prisma";

export async function getToken(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { username, password } = request.body as { username: string, password: string }
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username
      }
    }
  })

  if (!user) {
    return reply.status(401).send(new Error("Username and/or password incorrect"))
  }
  const passwordMatch = await compare(password, user.password)

  if (!passwordMatch) {
    return reply.status(401).send(new Error("Username and/or password incorrect"))
  }
  const payload = { user_id: user.id, username }
  const token = fastify.jwt.sign(
    { payload },
    {
      algorithm: 'HS256',
      expiresIn: 60 * 60 * 24 // 1 day
    })
  reply.send({ token })
}