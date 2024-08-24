import React from 'react';
import { useUser } from './UserContext';

const Categorization = () => {
  const { user } = useUser();  // Get user from UserContext

  return (
    <div>
      <h1>Categorization Page</h1>
      {user ? (
        <p>Hello, {user.displayName || 'User'}!</p>  // Display user name or fallback to 'User'
      ) : (
        <p>Loading user information...</p>
      )}
      {/* Your categorization page content */}
    </div>
  );
};

export default Categorization;
