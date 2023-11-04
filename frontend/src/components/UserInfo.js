// src/components/UserInfo.js
import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div>
      <h2>User Information</h2>
      <img src={user.profile_picture} alt={`${user.username}'s avatar`} />
      <p>Username: {user.username}</p>
    </div>
  );
};

export default UserInfo;
