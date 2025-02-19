// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'

import { scoresClient } from './services/scores/scores.shared.js'

import { teamsClient } from './services/teams/teams.shared.js'

import { roundPairingsClient } from './services/round-pairings/round-pairings.shared.js'

import { roundsClient } from './services/rounds/rounds.shared.js'

import { appStateClient } from './services/app-state/app-state.shared.js'

/**
 * Returns a  client for the feathers-realtime-react-demo app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(teamsClient)
  client.configure(roundPairingsClient)

  client.configure(scoresClient)

  client.configure(roundsClient)

  client.configure(appStateClient)

  return client
}
