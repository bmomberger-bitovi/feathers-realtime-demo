"use client"
import Image from 'next/image';
import styles from './page.module.css';
import { useFind } from 'figbird';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Crazy for Cribbage!</h1>
      <Leaderboard />
    </main>
  )
}

const Pairings = () => {
  return (
    <h3>Current Round Pairings:</h3>
  );
};

const Leaderboard = () => {
  const { data: teams, total } = useFind('teams');
  const { data: scores } = useFind('scores');

  const scoresByTeam = {};
  (teams || []).forEach(team => scoresByTeam[team.id] = 0);
  (scores || []).forEach(({ team1, team2, score1, score2 }) => {
    scoresByTeam[team1] += score1;
    scoresByTeam[team2] += score2;
  });

  if(teams) {
    teams.sort((a, b) => { return scoresByTeam[a.id] < scoresByTeam[b.id] ? 1 : -1 });
  }

  return (
    <>
      <h3>Leaderboard:</h3>
      {teams && teams.map((team, idx) => (
          <div key={`Team-${team.name}`}>
            {idx + 1}: {team.name} - {scoresByTeam[team.id]} points
          </div>
        ))}
    </>
  );
}