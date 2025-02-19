// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const appStateSchema = {
  $id: 'AppState',
  type: 'object',
  additionalProperties: false,
  required: [
    'round',
    'lastRound'
  ],
  properties: {
    id: { type: "number" },
    round: { type: 'number' },
    lastRound: { type: 'number' },
  }
}
export const appStateValidator = getValidator(appStateSchema, dataValidator)
export const appStateResolver = resolve({})

export const appStateExternalResolver = resolve({})

// Schema for updating existing data
export const appStatePatchSchema = {
  $id: 'AppStatePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...appStateSchema.properties
  }
}
export const appStatePatchValidator = getValidator(appStatePatchSchema, dataValidator)
export const appStatePatchResolver = resolve({})

// Schema for allowed query properties
export const appStateQuerySchema = {
  $id: 'AppStateQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(appStateSchema.properties)
  }
}
export const appStateQueryValidator = getValidator(appStateQuerySchema, queryValidator)
export const appStateQueryResolver = resolve({})
