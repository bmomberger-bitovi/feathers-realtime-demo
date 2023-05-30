"use client"
import { useCallback, useState } from 'react';
import { useFind, useMutation } from 'figbird';
import styles from '../../page.module.css';


export default function ScoresAdmin() {
  const { data: teams } = useFind('teams');
  const { data: scores } = useFind('scores');
  const { create, remove } = useMutation('scores');

  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const handleCreateNew = useCallback(
    () => {
      create({ team1, team2, score1, score2 });
      setTeam1('-');
      setTeam2('-');
      setScore1(0);
      setScore2(0);
    },
    [create, team1, team2, score1, score2]
  );
  const handleRemove = useCallback(
    (item) => {
      remove(item.id);
    },
    [remove]
  );

  return (
    <main className={styles.main}>
      <div>
        <h3>Match Scores</h3>
        <ul>
          {scores && scores.map(item => <li key={`Score-${item.id}`}>
            {((teams || []).find(team => team.id === item.team1) || { name: 'Unknown' }).name}
            {": "}
            { item.score1 }
            {" - "} 
            {((teams || []).find(team => team.id === item.team2) || { name: 'Unknown' }).name}
            {": "}
            { item.score2 }
            {" "}
            <button onClick={() => handleRemove(item)}>[X]</button>
          </li>)}
        </ul>
      </div>
      <div>
        <h3>Add new match result</h3>
        <div>
          Team 1: 
          <select value={team1} onChange={(ev) => setTeam1(+ev.target.value)}>
            <option key={`team1-null`}>-</option>
            {(teams || []).map(team => <option key={`team1-${team.id}`} value={team.id}>{team.name}</option>)}
          </select>
          Team 1 Score:
          <input value={score1} onChange={(ev) => setScore1(+ev.target.value)} />
          <br />
          Team 2: 
          <select value={team2} onChange={(ev) => setTeam2(+ev.target.value)}>
            <option key={`team2-null`}>-</option>
            {(teams || []).map(team => <option key={`team2-${team.id}`} value={team.id}>{team.name}</option>)}
          </select>
          Team 2 Score:
          <input value={score2} onChange={(ev) => setScore2(+ev.target.value)} />
        </div>
        <div>
          <button onClick={handleCreateNew} >Post Result</button>
        </div>
      </div>
    </main>
  );
} 