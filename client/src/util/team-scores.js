const WIN_POINTS = 2;
const SKUNK_POINTS = 3;
const DOUBLE_SKUNK_POINTS = 4;
const TRIPLE_SKUNK_POINTS = 5;

export const TOURNAMENT_SCORE_TEMPLATE = {
  tournamentPoints: 0,
  totalVictoryMargin: 0,
  totalWins: 0
};

export const calculateTeamScores = (scores) => {
  console.log(scores?.length, "scores")
  const scoresByTeam = {};
  scores.forEach(({ roundPairing: { team1, team2 }, score1, score2 }) => {
    scoresByTeam[team1.id] = scoresByTeam[team1.id] ?? { ...TOURNAMENT_SCORE_TEMPLATE };
    scoresByTeam[team2.id] = scoresByTeam[team2.id] ?? { ...TOURNAMENT_SCORE_TEMPLATE };

    const result = calculateGameResult(team1.id, team2.id, score1, score2);

    Object.entries(result).forEach(([teamId, points]) => {
      scoresByTeam[teamId].tournamentPoints += points;
    });

    if (score1 > score2) {
      scoresByTeam[team1.id].totalWins ++;
      scoresByTeam[team1.id].totalVictoryMargin += (score1 > 61 ? 1 : 2) * (score1 - score2);
    }
    if (score2 > score1) {
      scoresByTeam[team2.id].totalWins ++;
      scoresByTeam[team2.id].totalVictoryMargin += (score2 > 61 ? 1 : 2) * (score2 - score1);
    }

  });
  return scoresByTeam;
};


export const calculateGameResult = (team1Id, team2Id, score1, score2) => {
  let winnerId, loserId;
  let winningScore, losingScore;
  if (score1 === score2) {
    // A TIE???
    // (probably just haven't added the score for this game yet)
    return { [team1Id]: 0, [team2Id]: 0 };
  }

  winnerId = score1 > score2 ? team1Id : team2Id;
  loserId = score2 > score1 ? team1Id : team2Id;

  winningScore = Math.max(score1, score2);
  losingScore = Math.min(score1, score2);
  const margin = winningScore - losingScore;

  const winPoints = winningScore > 61 ? (
      margin > 90 ? TRIPLE_SKUNK_POINTS : margin > 60 ? DOUBLE_SKUNK_POINTS : margin > 30 ? SKUNK_POINTS : WIN_POINTS
    ) : (
      margin > 30 ? DOUBLE_SKUNK_POINTS : WIN_POINTS
    );

  return {
    [winnerId]: winPoints,
    [loserId]: 0,
  };
}