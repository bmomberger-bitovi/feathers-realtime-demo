export const roundPairingsPath = 'round-pairings'

export const roundPairingsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const roundPairingsClient = client => {
  const connection = client.get('connection')

  client.use(roundPairingsPath, connection.service(roundPairingsPath), {
    methods: roundPairingsMethods
  })
}
