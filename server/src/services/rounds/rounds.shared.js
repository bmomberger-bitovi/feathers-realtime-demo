export const roundsPath = 'rounds'

export const roundsMethods = ['create']

export const roundsClient = client => {
  const connection = client.get('connection')

  client.use(roundsPath, connection.service(roundsPath), {
    methods: roundsMethods
  })
}
