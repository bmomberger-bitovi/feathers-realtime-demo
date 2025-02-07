// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  roundsDataValidator,
  roundsDataResolver,
} from './rounds.schema.js'
import { RoundsService } from './rounds.class.js'
// import { roundPairingsPath, roundPairingsMethods } from './round-pairings.shared.js'

import { roundsPath, roundsMethods } from './rounds.shared.js';

// A configure function that registers the service and its hooks via `app.configure`
export const rounds = app => {
  // Register our service on the Feathers application
  app.use(roundsPath, new RoundsService(app), {
    // A list of all methods this service exposes externally
    methods: roundsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(roundsPath).hooks({
    around: {
    },
    before: {
      all: [
      ],
      create: [
        schemaHooks.validateData(roundsDataValidator),
        schemaHooks.resolveData(roundsDataResolver)
      ],
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}