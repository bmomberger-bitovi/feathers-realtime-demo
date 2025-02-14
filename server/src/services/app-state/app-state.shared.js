export const appStatePath = 'app-state'

export const appStateMethods = ['find', 'get', 'patch']

export const appStateClient = client => {
  const connection = client.get('connection')

  client.use(appStatePath, connection.service(appStatePath), {
    methods: appStateMethods
  })
}
