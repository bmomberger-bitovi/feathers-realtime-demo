"use client"
import { useCallback, useMemo, useState } from 'react';
import { useFind, useGet, useMutation } from 'figbird';
import styles from '../../page.module.css';


export default function RoundsAdmin() {
  const { data: pairings } = useFind('round-pairings');
  const { create } = useMutation('rounds');
  const { patch: updateRound } = useMutation('app-state');
  const appStateResponse = useGet('app-state', 1);
  const [newTeamName, setNewTeamName] = useState();

  const state = appStateResponse.data || {};

  const pairingsByRound = useMemo(() => {
    return pairings ? pairings.reduce((acc, datum) => ({
      ...acc,
      [datum.round]: [...(acc[datum.round] ?? []), datum]
    }), {}) : {};
  }, [pairings]);

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
        <h3>Set current round</h3>
        <select value={state.round} onChange={ev => updateRound(1, { round: +ev.target.value })}>
          {new Array(+state.lastRound || 1).fill(0).map((z, i) => i + 1).map(round => (
            <option key={`Round-${round}-option`}>{round}</option>
          ))}
        </select>
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