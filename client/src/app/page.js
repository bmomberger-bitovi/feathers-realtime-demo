"use client"
import Image from 'next/image';
import styles from './page.module.css';
import { useFind, useGet } from 'figbird';
import { calculateTeamScores, TOURNAMENT_SCORE_TEMPLATE } from '../util/team-scores';

const calculateAverageMargin = (tournamentScore) => {
  return tournamentScore?.totalWins > 0
    ? (tournamentScore.totalVictoryMargin / tournamentScore.totalWins).toFixed(2)
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
          <Pairings round={state.round} />
        </div>
      </div>
    </main>
  )
}

const Pairings = ({
  round
}) => {
  const { data: pairings } = useFind('round-pairings', { query: { round } });

  return (
    <section style={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <h3>Round {round} Pairings:</h3>

      <ul style={{ marginLeft: '1rem'}}>
        {pairings?.map(({ team1, team2 }) => (
          <li key={`pairing-${round}-${team1.name}-${team2.name}`}>{team1.name} vs {team2.name}</li>
        ))}
      </ul>
    </section>
  );
};

const Leaderboard = () => {
  const { data: teams, total } = useFind('teams');
  const { data: scores } = useFind('scores');

  const scoresByTeam = calculateTeamScores(scores ?? []);

  if(teams) {
    teams.sort((a, b) => {
      const aScore = scoresByTeam[a.id] ?? TOURNAMENT_SCORE_TEMPLATE;
      const bScore = scoresByTeam[b.id] ?? TOURNAMENT_SCORE_TEMPLATE;
      const aAvg = calculateAverageMargin(scoresByTeam[a.id]);
      const bAvg = calculateAverageMargin(scoresByTeam[b.id]);

      if(aScore.tournamentPoints < bScore.tournamentPoints) {
        return 1;
      }
      if(aScore.tournamentPoints > bScore.tournamentPoints) {
        return -1;
      }
      if(aAvg < bAvg) {
        return 1;
      }
      if(bAvg > aAvg) {
        return 0;
      }
    })
  }

  let isTie = false;
  let lastUniqueId = -1;
  let lastUniqueResult = null;
  const teamsWithPointsAndRank = teams?.map((team) => {
    const retVal = {
      ...team,
      points: scoresByTeam[team.id]?.tournamentPoints ?? 0,
      tiebreaker: calculateAverageMargin(scoresByTeam[team.id]),
    };
    return retVal;
  }) ?? [];
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
            {rankedTeam.tiebreaker} tiebreaker points)
          </div>
      ))}
      </section>
    </>
  );
}