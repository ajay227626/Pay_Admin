import React, { useEffect, useState } from 'react';

const ModalHeader = ({ templateName, onTemplateNameChange, templateSubject, onTemplateSubjectChange, aiEnabled, onAiToggle, isMaximized, onMaximize, onClose, isDirty, onDirtyChange, barsOpen, setBarsOpen, type }) => {
    const textColor = type === 'edit' ? 'text-cbx-dark' : 'text-gray-400';
    const [ isEditingName, setIsEditingName ] = useState(type === 'edit');
    const [ isEditingSubject, setIsEditingSubject ] = useState(type === 'edit');
    const [ tempName, setTempName ] = useState(templateName);
    const [ tempSubject, setTempSubject ] = useState(templateSubject);
    const [ flexDirection, setFlexDirection ] = useState(window.innerWidth >= 1024 ? 'flex-row' : 'flex-col');
    const handleNameSubmit = () => {
        onTemplateNameChange(tempName);
        setIsEditingName(false);
        onDirtyChange(true);
    };
    const handleSubjectSubmit = () => {
        onTemplateSubjectChange(tempSubject);
        setIsEditingSubject(false);
        onDirtyChange(true);
    };
    const handleKeyPress = (e, type) => {
        if (e.key === 'Enter') {
            if (type === 'name') handleNameSubmit();
            if (type === 'subject') handleSubjectSubmit();
        } else if (e.key === 'Escape') {
            if (type === 'name') {
                setTempName(templateName);
                setIsEditingName(false);
            }
            if (type === 'subject') {
                setTempSubject(templateSubject);
                setIsEditingSubject(false);
            }
        }
    };
    useEffect(() => {
        const handleResize = () => {
            setFlexDirection(window.innerWidth >= 1024 ? 'flex-row' : 'flex-col');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); };
    }, []);
    return (
        <div className="flex flex-col border-b border-gray-200 bg-white">
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-0">
                {/* Left Section - Template Name */}
                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                    <i className={`w-4 h-4 text-cbx-dark hover:text-cbx-light cursor-pointer transition-transform duration-300 ease-in-out ${type === 'edit' ? ( barsOpen ? 'fas fa-times rotate-90' : 'fas fa-bars rotate-0' ) : 'hidden' }`} onClick={() => setBarsOpen(!barsOpen)} title={barsOpen ? 'Minimize' : 'Maximize'} />
                    {isEditingName && type === 'edit' ? ( <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} onBlur={handleNameSubmit} onKeyPress={(e) => handleKeyPress(e, 'name')} className="text-lg sm:text-xl font-semibold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none min-w-0 flex-1 sm:flex-none" autoFocus /> ) : ( <h2 onClick={() => setIsEditingName(true)} className={`text-lg sm:text-xl font-semibold text-gray-800 ${type === 'edit' && 'cursor-pointer hover:text-blue-600'} transition-colors truncate flex-1 sm:flex-none`}>{templateName} {isDirty && <span className="ml-2 text-orange-500">•</span>}</h2> )}
                </div>
                {/* Subject Line Row */}
                <div className={`flex ${flexDirection} ${flexDirection === 'flex-col' ? 'items-start' : 'items-center'} space-x-2 sm:space-x-3`}>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <i className={`fas fa-envelope w-4 h-4 ${textColor}`} />
                        <span className="text-xs sm:text-sm font-medium text-gray-600 min-w-0">Subject:</span>
                    </div>
                    {isEditingSubject && type === 'edit' ? ( <input type="text" value={tempSubject} onChange={(e) => setTempSubject(e.target.value)} onBlur={handleSubjectSubmit} onKeyPress={(e) => handleKeyPress(e, 'subject')} className="flex-1 text-xs sm:text-sm text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none" placeholder="Enter email subject line..." autoFocus /> ) : ( <div onClick={() => setIsEditingSubject(true)} className={`flex-1 text-xs sm:text-sm text-gray-800 ${type === 'edit' && 'cursor-pointer hover:text-blue-600'} transition-colors py-1 border-b border-transparent hover:border-gray-300`}> {templateSubject || 'Click to add subject line...'}</div> )}
                </div>
                {/* Center Section - AI Toggle */}
                <div className="flex items-center space-x-2 sm:space-x-3 order-3 sm:order-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-600 hidden sm:inline">AI Assistant</span>
                    <button onClick={() => type === 'edit' && onAiToggle(!aiEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full ${type === 'edit' ? 'cursor-pointer' : 'cursor-no-drop'} transition-colors ${ aiEnabled && type === 'edit' ? 'bg-blue-600' : 'bg-gray-300' }`}><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ aiEnabled && type === 'edit' ? 'translate-x-6' : 'translate-x-1' }`} /></button>
                    <button className={`p-1 sm:p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors ${type === 'edit' ? 'cursor-pointer' : 'cursor-no-drop'}`}><i className="fas fa-cog w-4 h-4" /></button>
                    { isDirty && (
                        <div className="flex items-center text-orange-600 text-xs sm:text-sm mr-1 sm:mr-3">
                            <i className="fas fa-exclamation-triangle w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Unsaved changes</span>
                            <span className="sm:hidden">Unsaved</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalHeader;