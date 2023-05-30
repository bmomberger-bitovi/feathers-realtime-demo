// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  scoresDataValidator,
  scoresPatchValidator,
  scoresQueryValidator,
  scoresResolver,
  scoresExternalResolver,
  scoresDataResolver,
  scoresPatchResolver,
  scoresQueryResolver
} from './scores.schema.js'
import { ScoresService, getOptions } from './scores.class.js'
import { scoresPath, scoresMethods } from './scores.shared.js'

export * from './scores.class.js'
export * from './scores.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const scores = (app) => {
  // Register our service on the Feathers application
  app.use(scoresPath, new ScoresService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: scoresMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(scoresPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(scoresExternalResolver), schemaHooks.resolveResult(scoresResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(scoresQueryValidator), schemaHooks.resolveQuery(scoresQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(scoresDataValidator), schemaHooks.resolveData(scoresDataResolver)],
      patch: [schemaHooks.validateData(scoresPatchValidator), schemaHooks.resolveData(scoresPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
