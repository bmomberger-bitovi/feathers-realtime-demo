"use client"
import Image from 'next/image';
import styles from './page.module.css';
import { useFind, useGet } from 'figbird';
import { calculateTeamScores, TOURNAMENT_SCORE_TEMPLATE } from '../util/team-scores';

const calculateAverageMargin = (tournamentScore) => {
  return tournamentScore?.totalWins > 0
    ? (tournamentScore.totalVictoryMargin / tournamentScore.totalWins)
    : 0;
}


export default function Home() {
  const response = useGet('app-state', 1);
  const state = response.data || {};
  
  return (
    <main className={styles.main}>
      <h1>Crazy for Cribbage 2025!</h1>
      <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: '3em', width: '100%' }}>
        <div style={{ minWidth: "49%", border: '3px solid blue', padding: '1rem' }}> 
          <Leaderboard />
        </div>
        <div style={{ minWidth: "49%", border: '3px solid red', padding: '1rem' }}> 
          <Pairings round={state.round} lastRound={state.lastRound} />
        </div>
      </div>
    </main>
  )
}

const Pairings = ({
  round,
  lastRound,
}) => {
  const { data: pairings } = useFind('round-pairings', { query: { round } });
  const { data: nextRoundPairings } = useFind('round-pairings', { query: { round: round + 1 } });
  let { data: teamsOnBye } = useFind('teams');
  pairings?.forEach(({ team1, team2 }) => {
    teamsOnBye = teamsOnBye.filter(team => team.id !== team1.id && team.id !== team2.id);
  });

  return (
    <section style={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <h3>Round {round} Pairings:</h3>

      <ul style={{ marginLeft: '1rem'}}>
        {pairings?.map(({ team1, team2 }) => (
          <li key={`pairing-${round}-${team1.name}-${team2.name}`}>{team1.name} vs {team2.name}</li>
        ))}
      </ul>

      <br />

      {round < lastRound && (
        <>
        <h3>Next Round ({round + 1}) Pairings:</h3>

        <ul style={{ marginLeft: '1rem'}}>
          {nextRoundPairings?.map(({ team1, team2 }) => (
            <li key={`pairing-${round + 1}-${team1.name}-${team2.name}`}>{team1.name} vs {team2.name}</li>
          ))}
        </ul>
        </>
      )}

      <br />

    </section>
  );
};

const Leaderboard = () => {
  const { data: teams, total } = useFind('teams');
  const { data: scores } = useFind('scores');

  const scoresByTeam = calculateTeamScores(scores ?? []);

  console.log(scoresByTeam)

  let isTie = false;
  let lastUniqueId = -1;
  let lastUniqueResult = null;
  const teamsWithPointsAndRank = teams?.map((team) => {
    const retVal = {
      ...team,
      points: scoresByTeam[team.id]?.tournamentPoints ?? 0,
      tiebreaker: calculateAverageMargin(scoresByTeam[team.id]) ?? 0,
    };
    return retVal;
  }) ?? [];

  teamsWithPointsAndRank.sort((a, b) => {
      const aScore = a.points;
      const bScore = b.points;
      const aAvg = a.tiebreaker;
      const bAvg = b.tiebreaker;

      if(aScore < bScore) {
        return 1;
      }
      if(aScore > bScore) {
        return -1;
      }
      if(aAvg < bAvg) {
        return 1;
      }
      if(aAvg > bAvg) {
        return -1;
      }
      return 0;
    });

  teamsWithPointsAndRank.forEach((team, idx) => {
    const prev = teamsWithPointsAndRank[idx - 1];
    const next = teamsWithPointsAndRank[idx + 1];

    const isPrevTie =
      (team.points === prev?.points 
        && team.tiebreaker === prev?.tiebreaker);
    const isNextTie =
      (team.points === next?.points 
        && team.tiebreaker === next?.tiebreaker);
    lastUniqueId = isPrevTie ? lastUniqueId : idx;
    lastUniqueResult = isPrevTie ? lastUniqueResult : team;

    team.rank = `${isPrevTie || isNextTie ? 'T-' : ''}${lastUniqueId + 1}`;

  });

  return (
    <>
      <section style={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <h3>Leaderboard:</h3>
      {teamsWithPointsAndRank.map(rankedTeam => (
          <div key={`Team-${rankedTeam.name}`}>
            {rankedTeam.rank}: {rankedTeam.name} (
            {rankedTeam.player1} &amp; {rankedTeam.player2}
            ) - {rankedTeam.points} points (
            {rankedTeam.tiebreaker.toFixed(2)} tiebreaker points)
          </div>
      ))}
      </section>
    </>
  );
}