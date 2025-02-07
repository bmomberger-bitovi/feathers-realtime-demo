// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax, virtual } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const roundPairingsSchema = {
  $id: 'RoundPairings',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'round', 'team1', 'team2'],
  properties: {
    id: { type: 'number' },
    round: { type: 'number' },
    team1: { $ref: 'Teams' },
    team2: { $ref: 'Teams' },
  }
}
export const roundPairingsValidator = getValidator(roundPairingsSchema, dataValidator)
export const roundPairingsResolver = resolve({})

export const roundPairingsExternalResolver = resolve({})

// Schema for creating new data
export const roundPairingsDataSchema = {
  $id: 'RoundPairingsData',
  type: 'object',
  additionalProperties: false,
  required: ['round', 'team1_id', 'team2_id'],
  properties: {
    id: roundPairingsSchema.properties.id,
    round: roundPairingsSchema.properties.round,
    team1_id: {type: 'number'},
    team2_id: {type: 'number'},
  }
}
export const roundPairingsDataValidator = getValidator(roundPairingsDataSchema, dataValidator)
export const roundPairingsDataResolver = resolve({})

// Schema for updating existing data
export const roundPairingsPatchSchema = {
  $id: 'RoundPairingsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    id: roundPairingsSchema.properties.id,
    round: roundPairingsSchema.properties.round,
    team1_id: {type: 'number'},
    team2_id: {type: 'number'},
  }
}
export const roundPairingsPatchValidator = getValidator(roundPairingsPatchSchema, dataValidator)
export const roundPairingsPatchResolver = resolve({})

// Schema for allowed query properties
export const roundPairingsQuerySchema = {
  $id: 'RoundPairingsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax({
      ...roundPairingsSchema.properties,
      team1: { $ref: 'TeamsQuery' },
      team2: { $ref: 'TeamsQuery' },
    })
  }
}
export const roundPairingsQueryValidator = getValidator(roundPairingsQuerySchema, queryValidator)
export const roundPairingsQueryResolver = resolve({})
