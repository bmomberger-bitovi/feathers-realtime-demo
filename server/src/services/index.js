import { appState } from './app-state/app-state.js'
import { teams } from './teams/teams.js'
import { roundPairings } from './round-pairings/round-pairings.js'
import { scores } from './scores/scores.js'
import { rounds } from './rounds/rounds.js'

export const services = app => {
  app.configure(appState)

  app.configure(teams)

  app.configure(roundPairings)

  app.configure(scores)

  app.configure(rounds)
  // All services will be registered here
}
