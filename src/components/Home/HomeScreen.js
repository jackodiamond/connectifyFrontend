import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css'; // Import the stylesheet

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownItems = [
    { label: 'Video', value: 'video' },
    { label: 'Audio', value: 'audio' },
    { label: 'Text', value: 'text' },
    { label: 'Profile', value: 'profile' },
    { label: 'Logout', value: 'logout' },
  ];

  const handleItemClick = (item) => {
    console.log("item : ",item)
    if(item.label.includes("Video"))
    {
      navigate('/video');
    }
    if(item.label.includes("Audio"))
    {
      navigate('/audio');
    }
    if(item.label.includes("Text"))
    {
      navigate('/text');
    }
    if(item.label.includes("Profile"))
    {
      navigate('/profile');
    }
    if(item.label.includes("Logout"))
    {
      navigate('/');
    }
  };

  const renderDropdownItem = (item) => (
    <li key={item.value} onClick={() => handleItemClick(item)}>
      {item.label}
    </li>
  );

  return (
    <div className="home-screen">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <span>...</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {dropdownItems.map(renderDropdownItem)}
        </ul>
      )}
    </div>
  );
};

export default HomeScreen;
