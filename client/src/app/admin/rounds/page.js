"use client"
import { useCallback, useMemo, useState } from 'react';
import { useFind, useMutation } from 'figbird';
import styles from '../../page.module.css';


export default function RoundsAdmin() {
  const { data } = useFind('round-pairings');
  const { create } = useMutation('rounds');
  const [newTeamName, setNewTeamName] = useState();

  const pairingsByRound = useMemo(() => {
    return data ? data.reduce((acc, datum) => ({
      ...acc,
      [datum.round]: [...(acc[datum.round] ?? []), datum]
    }), {}) : {};
  }, [data]);

  const handleCreateNew = useCallback(
    () => {
      create({ number: Object.keys(pairingsByRound).length + 1 });
    },
    [create, pairingsByRound]
  );

  return (
    <main className={styles.main}>
      <div>
        <h3>Rounds and Pairings</h3>
        <ul>
          {Object.entries(pairingsByRound).map(([round, pairings]) => (
            <li key={`Round-${round}`}>
              Round {round}
              <ul>
                {pairings.map(({team1, team2}) => (
                  <li key={`Round-${round}-pairing-${team1.name}-${team2.name}`}>
                    {team1.name} vs {team2.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add new round</h3>

        <div>
          <button onClick={handleCreateNew} >Create next round</button>
        </div>
      </div>
    </main>
  );
} 