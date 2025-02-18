import { KnexService } from '@feathersjs/knex'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TeamsService extends KnexService {}

export const getOptions = (app) => {
  return {
    paginate: {
      ...app.get('paginate'),
      default: 100
    },
    Model: app.get('postgresqlClient'),
    name: 'teams'
  }
}
