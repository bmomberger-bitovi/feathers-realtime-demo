"use client"
import { useCallback, useState } from 'react';
import { useFind, useGet, useMutation } from 'figbird';
import styles from '../../page.module.css';

function ScoreEntry ({
  team1,
  team2,
  id,
}) {
  const { create, remove } = useMutation('scores');

  const { data: existingScores } = useFind('scores', { query: { round_pairing_id: id }})

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const handleCreateNew = useCallback(
    () => {
      create({ round_pairing_id: id, score1, score2 });
    },
    [create, id, score1, score2]
  );
  const handleRemove = useCallback(
    (scoreId) => {
      remove(scoreId);
    },
    [remove]
  );

  return (
    <div>
      <div className={styles.table3col}>
          <span>{team1.name}</span>
          <span>{team2.name}</span>
          <span></span>
        {
          existingScores?.map(({ id, score1, score2 }) => (
            <>
              <span key={`ExistingScore-${id}-1`}>{score1}</span>
              <span key={`ExistingScore-${id}-3`}>{score2}</span>
              <span key={`ExistingScore-${id}-remove`}><button onClick={() => handleRemove(id)}>[X]</button></span>
            </>
          ))
        }
        <input value={score1} onChange={(ev) => setScore1(+ev.target.value)} />
        <input value={score2} onChange={(ev) => setScore2(+ev.target.value)} />
        <button onClick={handleCreateNew} >Post Result</button>
      </div>
    </div>
  );
}

function ScoresEntry({
  round,
  pairings
}) {
  const roundPairings = pairings?.filter(p => p.round === round);

  return roundPairings?.map(pairing => (
    <ScoreEntry key={`ScoreEntry-${pairing.id}`} {...pairing} />
  ));
}


export default function ScoresAdmin() {
  const { data: pairings } = useFind('round-pairings');
  const appStateResponse = useGet('app-state', 1);

  const { data: scores } = useFind('scores');



  return (
    <main className={styles.main}>
      <div>
        <h3>Match Scores</h3>
{/*        <ul>
          {scores && scores.map(item => <li key={`Score-${item.id}`}>
            Round { item.round }:
            {((teams || []).find(team => team.id === item.team1) || { name: 'Unknown' }).name}
            {": "}
            { item.score1 }
            {" - "} 
            {((teams || []).find(team => team.id === item.team2) || { name: 'Unknown' }).name}
            {": "}
            { item.score2 }
            {" "}
            
          </li>)}
        </ul>
*/}      </div>
      <div>
        <h3>Match results for Round {appStateResponse?.data?.round}</h3>
        <ScoresEntry round={appStateResponse?.data?.round} pairings={pairings} />
      </div>
    </main>
  );
} 