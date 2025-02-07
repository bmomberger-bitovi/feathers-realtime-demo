import Link from 'next/link';
 
export default function AdminLinks({ children }) {
  return (
    <>
      <div>
        <Link href="/admin">Admin Home</Link>
        {" | "}
        <Link href="/admin/teams">Teams Admin</Link>
        {" | "}
        <Link href="/admin/rounds">Rounds and Pairings</Link>
        {" | "}
        <Link href="/admin/scores">Record Scores</Link>
      </div>
      {children}
    </>
  );
}