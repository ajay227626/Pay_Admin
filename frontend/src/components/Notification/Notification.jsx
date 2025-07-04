import React from "react";
import "./Notification.css";

const Notification = ({ visible, message, type }) => {
  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      <span className="notification-icon">
        {type === "positive" ? <i className="fas fa-check"></i> : type === "negative" ? <i className="fas fa-times"></i> : ""}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Notification;