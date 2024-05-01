import React, { useState, useEffect, Fragment,useContext } from 'react';
import './Profile.css';
import HomeScreen from '../Home/HomeScreen';
import UserContext from '../../UserContext';
import axios from 'axios';
import config from '../../config';

function Profile() {
  const { username,profilePic,setProfilePic } = useContext(UserContext);

  const handleChangeAvatar = async () => {
    // Logic to handle changing the avatar
    console.log("Change Avatar clicked!");

    let newProfilePic

    const num = Math.random()
    if(num<0.5)
    {
      newProfilePic = "https://avatar.iran.liara.run/public/boy?username="+username+Math.floor(Math.random()*1000);
    }else
    {
      newProfilePic = "https://avatar.iran.liara.run/public/girl?username="+username+Math.floor(Math.random()*1000);
    }

    try {
      // Call the PUT API to update the bio
      await axios.put(config.apiUrl+`profile/`, { username:username, profilePicURL: newProfilePic });

      setProfilePic(newProfilePic);
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };


  return (
    <Fragment>
      <HomeScreen />
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar-container">
            <img src={profilePic} alt="Profile Picture" className="profile-pic" />
            <button className="change-avatar-btn" onClick={handleChangeAvatar}>Change Avatar</button>
          </div>
          <div className="user-info">
            <h2 className="username">{username}</h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
