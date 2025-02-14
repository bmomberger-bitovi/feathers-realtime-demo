// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  appStatePatchValidator,
  appStateQueryValidator,
  appStateResolver,
  appStateExternalResolver,
  appStatePatchResolver,
  appStateQueryResolver
} from './app-state.schema.js'
import { AppStateService, getOptions } from './app-state.class.js'
import { appStatePath, appStateMethods } from './app-state.shared.js'

export * from './app-state.class.js'
export * from './app-state.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const appState = app => {
  // Register our service on the Feathers application
  app.use(appStatePath, new AppStateService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: appStateMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(appStatePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(appStateExternalResolver),
        schemaHooks.resolveResult(appStateResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(appStateQueryValidator),
        schemaHooks.resolveQuery(appStateQueryResolver)
      ],
      find: [],
      get: [],
      patch: [
        schemaHooks.validateData(appStatePatchValidator),
        schemaHooks.resolveData(appStatePatchResolver)
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
