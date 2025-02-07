export class RoundsService {
  app = null;
  constructor(app) {
    this.app = app;
  }
  async create(data, params) {
    const { number } = data;

    const { data: teams } = await this.app.service('teams').find({});

    teams.sort((a, b) => a.id < b.id ? 1 : -1);

    const floater = teams.shift();

    for(let i = 0; i < number; i++) {
      teams.push(teams.shift()); // rotate rest i times.
    }
    const bottomHalf = teams.splice(teams.length / 2);
    const topHalf = [floater, ...teams];

    const result = { pairings: [] }

    for (let j = 0; j < topHalf.length; j++) {
      result.pairings.push(await this.app.service('round-pairings').create({
        team1: topHalf[j],
        team2: bottomHalf[j],
        round: number,
      }));
    }

    return result;
  }
}