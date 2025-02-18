"use client"
import { useCallback, useMemo, useState } from 'react';
import { useFind, useGet, useMutation } from 'figbird';
import styles from '../../page.module.css';


export default function RoundsAdmin() {
  const { data: pairings } = useFind('round-pairings');
  const { data: teams } = useFind('teams');
  const { create: createPairing, remove: removePairing } = useMutation('round-pairings');

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

  const [pairingTeam1, setPairingTeam1] = useState();
  const [pairingTeam2, setPairingTeam2] = useState();
  const [pairingRound, setPairingRound] = useState(1);

  const handleCreateNewPairing = useCallback(
    () => {
      createPairing({ team1_id: pairingTeam1, team2_id: pairingTeam2, round: pairingRound || Math.min(state.round + 1, state.lastRound) });
    },
    [createPairing, pairingTeam1, pairingTeam2, pairingRound, state.round, state.lastRound]
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
                {pairings.map(({id, team1, team2}) => (
                  <li key={`Round-${round}-pairing-${team1.name}-${team2.name}`}>
                    {team1.name} vs {team2.name}
                    {" "}
                    <button onClick={() => removePairing(id)}>X</button>
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
        <h3>Create a round pairing</h3>
        <select value={pairingRound} onChange={ev => setPairingRound(+ev.target.value)}>
          {new Array(+state.lastRound || 1).fill(0).map((z, i) => i + 1).map(round => (
            <option key={`Round-${round}-option`}>{round}</option>
          ))}
        </select>

        <select value={pairingTeam1} onChange={ev => setPairingTeam1(+ev.target.value)}>
          <option value="">--</option>
          {teams?.map(team => (
            <option key={`Team1-Option-${team.id}`} value={team.id}>{team.name}</option>
          ))}
        </select>
        <select value={pairingTeam2} onChange={ev => setPairingTeam2(+ev.target.value)}>
          <option value="">--</option>
          {teams?.map(team => (
            <option key={`Team1-Option-${team.id}`} value={team.id}>{team.name}</option>
          ))}
        </select>
        <button onClick={handleCreateNewPairing} >Create Pairing</button> 
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