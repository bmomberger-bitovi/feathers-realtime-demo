export const scoresPath = 'scores'

export const scoresMethods = ['find', 'get', 'create', 'patch', 'remove']

export const scoresClient = (client) => {
  const connection = client.get('connection')

  client.use(scoresPath, connection.service(scoresPath), {
    methods: scoresMethods
  })
}
