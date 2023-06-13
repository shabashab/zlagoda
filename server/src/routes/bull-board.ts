import {
  FastifyAdapter,
  createBullBoard,
  BullMQAdapter
} from '@bull-board/fastify'
import { createPluginWithOptionsCallback } from '@helpers/createPluginWithOptions'

const fastifyAdapter = new FastifyAdapter()

createBullBoard({
  queues: globalThis.bullmq.queues.map((queue) => new BullMQAdapter(queue)),
  serverAdapter: fastifyAdapter
})

fastifyAdapter.setBasePath('/tasks')

export const prefix = '/tasks'
export const plugin = createPluginWithOptionsCallback(
  fastifyAdapter.registerPlugin(),
  {
    basePath: '/'
  }
)
