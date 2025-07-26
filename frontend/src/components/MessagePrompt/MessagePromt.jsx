import React from "react";
import './messageprompt.css';

export const EmailMessage = () => {
    return (
        <>
            <div className="message-header">
                <h2>Email Notification</h2>
            </div>
            <div className="message-body-parts">
                <div className="form-group">
                    <label htmlFor="recipient">Recipient:</label>
                    <input type="email" id="recipient" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body:</label>
                    <select id="body" className="form-select">
                        <option value="">Choose a predefined body or create</option>
                        <option value="default">Default</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body:</label>
                    <textarea id="body" className="form-control"></textarea>
                </div>
            </div>
        </>
    );
}

export const WAMessage = () => {
    return (
        <div className="message-header">
            <h2>Send WhatsApp Notification</h2>
        </div>
    );
}

export const BothMessage = () => {
    return (
        <div className="message-header">
            <h2>Send Both Notification</h2>
        </div>
    );
}

export const InitialMessage = ({ handleMessageTypeForward, setMessageType }) => {
    return (
        <div className="choose-type">
            <div className="message-type">
                <label htmlFor="messageType">Message Type:</label>
                <select id="messageType" className="form-select" onChange={(e) => setMessageType(e.target.value)}>
                    <option value="">Choose a message type</option>
                    <option value="email">Email</option>
                    <option value="wa">WhatsApp</option>
                    <option value="both">Both</option>
                </select>
            </div>
            <div><button className="btn btn-primary" onClick={handleMessageTypeForward}><i className="fas fa-arrow-right"></i></button></div>
        </div>
    );
}

function MessagePrompt() {
    const [ messageType, setMessageType ] = React.useState('');
    const [ step, setStep ] = React.useState('initial');
    const handleMessageTypeForward = () => {
        if (messageType) setStep(messageType);
        else alert("Please choose a message type.");
    };
    const renderStep = () => {
        switch (step) {
            case 'email': return <EmailMessage />;
            case 'wa': return <WAMessage />;
            case 'both': return <BothMessage />;
            default: return (
                        <InitialMessage
                            handleMessageTypeForward={handleMessageTypeForward}
                            setMessageType={setMessageType}
                        />
                    );
        }
    };

    return <div className="message-container">{renderStep()}</div>;
}

export default MessagePrompt;