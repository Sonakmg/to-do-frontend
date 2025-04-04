import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Logo = () => {
  return (
    <div className="logo">
      <FaCheckCircle className="logo-icon" size={32} />
      <span className="logo-text">Just Do IT</span>
    </div>
  );
};

export default Logo; 