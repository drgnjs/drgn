import fastify from 'fastify'

const api = fastify()

api.get('/', async () => {
  return { text: 'World' }
})

const start = async () => {
  try {
    await api.listen(9000)
  } catch (err) {
    api.log.error(err)
    process.exit(1)
  }
}
start()