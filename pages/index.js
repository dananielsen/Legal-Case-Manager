import Link from 'next/link';
// pages/index.js

import { useSession } from 'next-auth/react';
import useLogin from './login';

const IndexPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome to Aviato</h1>
      <p>Do you want to create a new account or log in?</p>
      {!session ? (
        <>
          <Link href="/register">Create a new account</Link>
          <br />
          <Link href="/login">Log in</Link>
        </>
      ) : (
        <useLogin />
      )}
    </div>
  );
};

export default IndexPage;