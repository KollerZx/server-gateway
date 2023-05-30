import fp from "fastify-plugin";
import jwt from '@fastify/jwt'
import { FastifyInstance, FastifyPluginOptions } from "fastify";

import { getToken } from '../middleware/getToken';
import { ensureAuthentication } from '../middleware/ensureAuthentication';
import { SECRET } from '../setup';


async function authPlugin(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify
    .register(jwt, { secret: SECRET })
    .post('/login', (request, reply) => getToken(fastify, request, reply))
    .decorate("authenticate", ensureAuthentication)

}

export default fp(authPlugin)