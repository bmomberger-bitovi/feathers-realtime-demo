"use client"
import { useCallback, useState } from 'react';
import { useFind, useMutation } from 'figbird';
import styles from '../../page.module.css';


export default function TeamsAdmin() {
  const { data } = useFind('teams');
  const { create, remove } = useMutation('teams');
  const [newTeamName, setNewTeamName] = useState();

  const handleCreateNew = useCallback(
    () => {
      create({ name: newTeamName });
      setNewTeamName('');
    },
    [create, newTeamName]
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
          <button onClick={handleCreateNew} >Create team</button>
        </div>
      </div>
    </main>
  );
} 