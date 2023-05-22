import fastify from "fastify";
import autoLoad from '@fastify/autoload'
import path from "path";
import { CONFIG } from "./setup";

const app = fastify({logger:true})

const start = async () => {
  try {
    await app.register(autoLoad, {
      dir: path.join(__dirname, 'plugins')
    })
    
    await app.register(autoLoad, {
      dir: path.join(__dirname, 'routes')
    })

    await app.listen({port: CONFIG.httpPort, host: CONFIG.host})
  } catch (error) {
    app.log.error(error)
  }
}
start()