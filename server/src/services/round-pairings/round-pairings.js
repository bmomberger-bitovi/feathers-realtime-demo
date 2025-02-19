// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  roundPairingsDataValidator,
  roundPairingsPatchValidator,
  roundPairingsQueryValidator,
  roundPairingsResolver,
  roundPairingsExternalResolver,
  roundPairingsDataResolver,
  roundPairingsPatchResolver,
  roundPairingsQueryResolver
} from './round-pairings.schema.js'
import { RoundPairingsService, getOptions } from './round-pairings.class.js'
import { roundPairingsPath, roundPairingsMethods } from './round-pairings.shared.js'

export * from './round-pairings.class.js'
export * from './round-pairings.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const roundPairings = app => {
  // Register our service on the Feathers application
  app.use(roundPairingsPath, new RoundPairingsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: roundPairingsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(roundPairingsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(roundPairingsExternalResolver),
        schemaHooks.resolveResult(roundPairingsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(roundPairingsQueryValidator),
        schemaHooks.resolveQuery(roundPairingsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        async (context) => {
          const { data } = context;
          data.team1_id = data.team1_id ?? data.team1.id;
          data.team2_id = data.team2_id ?? data.team2.id;
          delete data.team1;
          delete data.team2;
        },
        schemaHooks.validateData(roundPairingsDataValidator),
        schemaHooks.resolveData(roundPairingsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(roundPairingsPatchValidator),
        schemaHooks.resolveData(roundPairingsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [
        async (context) => {
          const { result, app } = context;
          const resultData = result.data ?? result;
          for (const resItem of Array.isArray(resultData) ? resultData : [resultData]) {
            resItem.team1 = await app.service('teams').get(resItem.team1_id);
            resItem.team2 = await app.service('teams').get(resItem.team2_id);
          }
        }
      ],
    },
    error: {
      all: []
    }
  })
}
