import { useState } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "positive",
  });

  const notify = (message, type = "positive") => {
    setNotification({ visible: true, message, type });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return { notification, notify };
};
