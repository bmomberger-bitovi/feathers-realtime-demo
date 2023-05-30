import { scores } from './scores/scores.js'

import { teams } from './teams/teams.js'

export const services = (app) => {
  app.configure(scores)

  app.configure(teams)

  // All services will be registered here
}
