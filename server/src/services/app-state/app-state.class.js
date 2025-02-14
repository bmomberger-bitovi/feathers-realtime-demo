import { MemoryService } from '@feathersjs/memory';

export class AppStateService extends MemoryService {}

export const getOptions = app => {
  return { 
    app,
    startId: 1,
    store: {
      1: {
        "id":1,"round":1,"lastRound":5
      },
    }
  }
}
