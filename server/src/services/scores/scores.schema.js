// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const scoresSchema = {
  $id: 'Scores',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'roundPairing', 'score1', 'score2'],
  properties: {
    id: { type: 'number' },
    roundPairing: { $ref: 'RoundPairings' },
    score1: { type: 'number' },
    score2: { type: 'number' }
  }
}
export const scoresValidator = getValidator(scoresSchema, dataValidator)
export const scoresResolver = resolve({})

export const scoresExternalResolver = resolve({})

// Schema for creating new data
export const scoresDataSchema = {
  $id: 'ScoresData',
  type: 'object',
  additionalProperties: false,
  required: ['roundPairing', 'gameNumber', 'score1', 'score2'],
  properties: {
    ...scoresSchema.properties
  }
}
export const scoresDataValidator = getValidator(scoresDataSchema, dataValidator)
export const scoresDataResolver = resolve({
  id: (value) => {
    return value || Math.floor(Math.random() * Math.pow(2, 31));
  }
})

// Schema for updating existing data
export const scoresPatchSchema = {
  $id: 'ScoresPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...scoresSchema.properties,
    roundPairing: { $ref: 'RoundPairingsPatch' },
  }
}
export const scoresPatchValidator = getValidator(scoresPatchSchema, dataValidator)
export const scoresPatchResolver = resolve({})

// Schema for allowed query properties
export const scoresQuerySchema = {
  $id: 'ScoresQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax({
      ...scoresSchema.properties,
      roundPairing: { $ref: 'RoundPairingsQuery' },
    }),
  }
}
export const scoresQueryValidator = getValidator(scoresQuerySchema, queryValidator)
export const scoresQueryResolver = resolve({})
