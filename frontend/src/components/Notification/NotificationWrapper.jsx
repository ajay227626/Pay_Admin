import React from 'react';
import Notification from './Notification';
import { useNotification } from '../SettingsProvider/SettingsProvider';

const NotificationWrapper = () => {
    const { notification } = useNotification();

    return (
        <Notification
            visible={notification.visible}
            message={notification.message}
            type={notification.type}
        />
    );
};

export default NotificationWrapper;
