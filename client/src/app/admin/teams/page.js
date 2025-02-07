"use client"
import { useCallback, useState } from 'react';
import { useFind, useMutation } from 'figbird';
import styles from '../../page.module.css';


export default function TeamsAdmin() {
  const { data } = useFind('teams');
  const { create, remove } = useMutation('teams');
  const [newTeamName, setNewTeamName] = useState();
  const [newPlayer1, setNewPlayer1] = useState();
  const [newPlayer2, setNewPlayer2] = useState();

  const handleCreateNew = useCallback(
    () => {
      create({ name: newTeamName, player1: newPlayer1, player2: newPlayer2 });
      setNewTeamName('');
      setNewPlayer1('');
      setNewPlayer2('');
    },
    [create, newTeamName, newPlayer1, newPlayer2]
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
        <h3>Registered Teams</h3>
        <ul>
          {data && data.map(item => <li key={`Team-${item.name}`}>{item.name} <button onClick={() => handleRemove(item)}>[X]</button></li>)}
        </ul>
      </div>
      <div>
        <h3>Add new team</h3>
        <div>
          Team name: 
          <input value={newTeamName} onChange={(ev) => setNewTeamName(ev.target.value)} />
        </div>
        <div>
          Player 1: 
          <input value={newPlayer1} onChange={(ev) => setNewPlayer1(ev.target.value)} />
        </div>
        <div>
          Player 2:
          <input value={newPlayer2} onChange={(ev) => setNewPlayer2(ev.target.value)} />
        </div>

        <div>
          <button onClick={handleCreateNew} >Create team</button>
        </div>
      </div>
    </main>
  );
} 