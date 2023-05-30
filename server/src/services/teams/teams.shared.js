export const teamsPath = 'teams'

export const teamsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const teamsClient = (client) => {
  const connection = client.get('connection')

  client.use(teamsPath, connection.service(teamsPath), {
    methods: teamsMethods
  })
}
