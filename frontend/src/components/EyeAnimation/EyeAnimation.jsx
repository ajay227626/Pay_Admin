import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import './EyeAnimation.css';

const EyeIcon = ({ isVisible }) => {
  return (
    <div className="eye-toggle-wrapper">
      <svg
        className={`eye-icon open-eye ${isVisible ? "visible" : "hidden"}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>

      <svg
        className={`eye-icon closed-eye ${!isVisible ? "visible" : "hidden"}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.4 21.4 0 0 1 5.07-6.13" />
        <path d="M1 1l22 22" />
      </svg>
    </div>
  );
};

export default EyeIcon;