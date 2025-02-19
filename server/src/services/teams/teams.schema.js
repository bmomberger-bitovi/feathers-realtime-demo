// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const teamsSchema = {
  $id: 'Teams',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'name'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    player1: { type: 'string' },
    player2: { type: 'string' },
  }
}
export const teamsValidator = getValidator(teamsSchema, dataValidator)
export const teamsResolver = resolve({})

export const teamsExternalResolver = resolve({})

// Schema for creating new data
export const teamsDataSchema = {
  $id: 'TeamsData',
  type: 'object',
  additionalProperties: false,
  required: ['name', 'player1', 'player2'],
  properties: {
    ...teamsSchema.properties
  }
}
export const teamsDataValidator = getValidator(teamsDataSchema, dataValidator)
export const teamsDataResolver = resolve({
  id: (value) => {
    return value || Math.floor(Math.random() * Math.pow(2, 31));
  }
})

// Schema for updating existing data
export const teamsPatchSchema = {
  $id: 'TeamsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...teamsSchema.properties
  }
}
export const teamsPatchValidator = getValidator(teamsPatchSchema, dataValidator)
export const teamsPatchResolver = resolve({})

// Schema for allowed query properties
export const teamsQuerySchema = {
  $id: 'TeamsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(teamsSchema.properties)
  }
}
export const teamsQueryValidator = getValidator(teamsQuerySchema, queryValidator)
export const teamsQueryResolver = resolve({})
