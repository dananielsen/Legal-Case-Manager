// pages/dashboard.js

import { useSession } from 'next-auth/react';
import Sidebar from '../components/sidenav';
import React, { useEffect } from 'react';


const Dashboard = () => {
  const { data: session } = useSession();

  // Assuming your API endpoint for fetching user data
  // Pass the user ID from the session
  const fetchUserData = async () => {
    const userData = await fetch(`/api/user/${session?.user.id}`);
    // Process userData...
  };

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);

  return (
  <Sidebar />
  );
};

export default Dashboard;
