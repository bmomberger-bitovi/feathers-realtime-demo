// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Schema for creating new data
export const roundsDataSchema = {
  $id: 'RoundsData',
  type: 'object',
  additionalProperties: false,
  required: ['number'],
  properties: {
    number: { type: 'number' },
  }
}
export const roundsDataValidator = getValidator(roundsDataSchema, dataValidator)
export const roundsDataResolver = resolve({})
