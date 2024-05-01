import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername, profilePic, setProfilePic }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
