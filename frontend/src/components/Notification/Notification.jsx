import React from "react";
import "./notification.css";
import { useNotification } from "../SettingsProvider/SettingsProvider";

const Notification = ({ visible, message, type }) => {
  if (!visible) return null;
  const { notification, setNotification } = useNotification();
  return (
    <div className={`notification ${type}`} onClick={() => setNotification({ ...notification, visible: false })}>
      <span className="notification-icon">
        {type === "positive" ? <i className="fas fa-check"></i> : type === "negative" ? <i className="fas fa-times"></i> : ""}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Notification;