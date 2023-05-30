// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  teamsDataValidator,
  teamsPatchValidator,
  teamsQueryValidator,
  teamsResolver,
  teamsExternalResolver,
  teamsDataResolver,
  teamsPatchResolver,
  teamsQueryResolver
} from './teams.schema.js'
import { TeamsService, getOptions } from './teams.class.js'
import { teamsPath, teamsMethods } from './teams.shared.js'

export * from './teams.class.js'
export * from './teams.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const teams = (app) => {
  // Register our service on the Feathers application
  app.use(teamsPath, new TeamsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: teamsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(teamsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(teamsExternalResolver), schemaHooks.resolveResult(teamsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(teamsQueryValidator), schemaHooks.resolveQuery(teamsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(teamsDataValidator), schemaHooks.resolveData(teamsDataResolver)],
      patch: [schemaHooks.validateData(teamsPatchValidator), schemaHooks.resolveData(teamsPatchResolver)],
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
