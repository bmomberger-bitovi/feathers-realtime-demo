import { KnexService } from '@feathersjs/knex'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ScoresService extends KnexService {}

export const getOptions = (app) => {
  return {
    paginate: {
      ...app.get('paginate'),
      default: 300,
      max: 300,
    },
    Model: app.get('postgresqlClient'),
    name: 'scores'
  }
}
