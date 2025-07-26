// C:\Users\CBX\Desktop\New Journey\Payment-app\src\components\Modal\ModalWrapper.jsx
import React from 'react';
import Modal from './Modal';
import { useModal } from '../SettingsProvider/SettingsProvider';

const ModalWrapper = () => {
    const { modal, closeModal } = useModal();

    if (!modal.visible) return null;

    return (
        <Modal
            isActive={modal.visible}
            modalTitle={modal.modalTitle}
            innerWidth={modal.innerWidth}
            content={modal.content}
            onClose1={modal.onClose1 || closeModal}
            buttonName1={modal.buttonName1}
            onClose2={modal.onClose2}
            buttonName2={modal.buttonName2}
        />
    );
};

export default ModalWrapper;
