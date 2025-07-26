import React, { useState } from 'react';
import { X, Maximize2, Minimize2, Settings, Save, AlertCircle } from 'lucide-react';
import './advancetemplatestyle.css'
import ModalHeader from './ModalHeader';
import AIConfigurationPanel from './AIConfigurationPanel';
import AdvancedTemplateEditor from './AdvancedTemplateEditor';
import TemplateLibrary from './TemplateLibrary';
import StyleCustomization from './StyleCustomization';
import PreviewPanel from './PreviewPanel';
import QuickActionsFooter from './QuickActionsFooter';
import ErrorHandling from './ErrorHandling';
import { useEmailTemplates } from '../../../SettingsProvider/SettingsProvider'

const AdvancedEmailTemplateModal = ({ isOpen, onClose, templateData, onSave, type }) => {
    const { emailTemplates, setEmailTemplates, handleEmailTemplateSave, emailTemplateId, setEmailTemplateId } = useEmailTemplates();
    const [ isMaximized, setIsMaximized ] = useState(false)
    const [ activeTab, setActiveTab ] = useState('editor');
    const [ aiPanelOpen, setAiPanelOpen ] = useState(false);
    const [ libraryPanelOpen, setLibraryPanelOpen ] = useState(false);
    const [ stylePanelOpen, setStylePanelOpen ] = useState(false);
    const [ previewPanelOpen, setPreviewPanelOpen ] = useState(false);
    const [ templateName, setTemplateName ] = useState(templateData?.name || 'Untitled Template');
    const [ templateContent, setTemplateContent ] = useState(templateData?.content || '');
    const [ templateSubject, setTemplateSubject ] = useState(templateData?.subject || '');
    const [ aiEnabled, setAiEnabled ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const [ isDirty, setIsDirty ] = useState(false);
    const [ barsOpen, setBarsOpen ] = useState(true);
    const [ templateStyles, setTemplateStyles ] = useState({
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        linkColor: '#1a73e8',
        maxWidth: '600px'
    });

    // if (!isOpen) return null;
    const handleSave = () => {
        const data = {
            id: emailTemplateId + 1 || 1,
            name: templateName,
            subject: templateSubject,
            content: templateContent,
            styles: templateStyles,
            createdOn: new Date().toISOString(),
            category: 'Custom',
            aiEnabled,
        };
        console.log('Saving template:', data);
        setEmailTemplates([...[...emailTemplates], data]);
        console.log('Updated emailTemplates:', [...[...emailTemplates], data]);
        setIsDirty(false);
        handleEmailTemplateSave();
    };

    const handleClose = () => {
        if (isDirty) {
            if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
                onClose();
            }
        } else {
            onClose();
        }
    };

    const handleContentChange = (content) => {
        setTemplateContent(content);
        setIsDirty(true);
    };

    const switchPanel = ( panel ) => {
        setAiPanelOpen(false);
        setLibraryPanelOpen(false);
        setStylePanelOpen(false);
        setPreviewPanelOpen(false);
        switch (panel) {
            case 'aiPanel':
                setAiPanelOpen(true);
                break;
            case 'libraryPanel':
                setLibraryPanelOpen(true);
                break;
            case 'stylePanel':
                setStylePanelOpen(true);
                break;
            case 'previewPanel':
                setPreviewPanelOpen(true);
                break;
            default:
                setAiPanelOpen(true);
                break;
        }
    };

    return (
        // <div className="fixed inset-0 z-50 overflow-hidden">
        <>
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" onClick={handleClose} /> */}
            {/* Modal Container */}
            <div className={`bg-white overflow-hidden transition-all duration-300 ease-in-out inset-0 rounded-none`}>
                {/* Top Header */}
                <ModalHeader templateName={templateName} onTemplateNameChange={setTemplateName} templateSubject={templateSubject} onTemplateSubjectChange={setTemplateSubject} aiEnabled={aiEnabled} onAiToggle={setAiEnabled} isMaximized={isMaximized} onMaximize={() => setIsMaximized(!isMaximized)} onClose={handleClose} isDirty={isDirty} onDirtyChange={setIsDirty} barsOpen={barsOpen} setBarsOpen={setBarsOpen} type={type} />
                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row h-full">
                    {/* Left Sidebar - Collapsible Panels */}
                    <div className={`flex flex-col bg-gray-50 ${ isMaximized || window.innerWidth >= 1024 ? `${ barsOpen && type === 'edit' ? 'lg:w-80' : 'w-0' } lg:border-r lg:border-gray-200` : `w-full border-b border-gray-200` } ${ barsOpen ? 'translate-x-0' : 'translate-x-[-100%]'} transition-all duration-300 ease-in-out`}>
                        {/* Panel Toggles */}
                        <div className="flex overflow-x-auto border-b border-gray-200 bg-white">
                            <button onClick={() => switchPanel('aiPanel')} className={`flex-shrink-0 min-w-0 flex-1 p-1 text-xs sm:text-sm font-medium transition-colors ${ aiPanelOpen ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800' }`}>
                              <div className="flex flex-col items-center min-w-0">
                                  <span className="text-base sm:text-lg mb-1">🤖</span>
                                  <span className="truncate">AI</span>
                              </div>
                            </button>
                            <button onClick={() => switchPanel('libraryPanel')} className={`flex-shrink-0 min-w-0 flex-1 p-1 text-xs sm:text-sm font-medium transition-colors ${ libraryPanelOpen ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-gray-800' }`}>
                                <div className="flex flex-col items-center min-w-0">
                                    <span className="text-base sm:text-lg mb-1">📚</span>
                                    <span className="truncate">Library</span>
                                </div>
                            </button>
                            <button onClick={() => switchPanel('stylePanel')} className={`flex-shrink-0 min-w-0 flex-1 p-1 text-xs sm:text-sm font-medium transition-colors ${ stylePanelOpen ? 'bg-green-50 text-green-700 border-b-2 border-green-500' : 'text-gray-600 hover:text-gray-800' }`}>
                                <div className="flex flex-col items-center min-w-0">
                                    <span className="text-base sm:text-lg mb-1">🎨</span>
                                    <span className="truncate">Style</span>
                                </div>
                            </button>
                            <button onClick={() => switchPanel('previewPanel')} className={`flex-shrink-0 min-w-0 flex-1 p-1 text-xs sm:text-sm font-medium transition-colors ${ previewPanelOpen ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-500' : 'text-gray-600 hover:text-gray-800' }`}>
                                <div className="flex flex-col items-center min-w-0">
                                    <span className="text-base sm:text-lg mb-1">👁️</span>
                                    <span className="truncate">Preview</span>
                                </div>
                            </button>
                        </div>
                        {/* Panel Content */}
                        <div className={`overflow-y-auto transition-all duration-300 ${ (aiPanelOpen || libraryPanelOpen || stylePanelOpen || previewPanelOpen) ? 'flex-1 lg:flex-1'  : 'h-0 lg:h-0' }`}>
                            {aiPanelOpen && (
                                <AIConfigurationPanel onConfigChange={() => setIsDirty(true)} onError={(error) => setErrors(prev => [...prev, error])} onContentSuggestion={(content) => handleContentChange(content)} type={type} />
                            )}
                            {libraryPanelOpen && (
                                <TemplateLibrary onTemplateSelect={(template) => {
                                    setTemplateContent(template.content);
                                    setTemplateSubject(template.subject);
                                    setTemplateName(template.name);
                                    setIsDirty(true);
                                }} onError={(error) => setErrors(prev => [...prev, error])} type={type} />
                            )}
                            {stylePanelOpen && (
                                <StyleCustomization styles={templateStyles} onStyleChange={(newStyles) => {
                                    setTemplateStyles(newStyles);
                                    setIsDirty(true);
                                }} onError={(error) => setErrors(prev => [...prev, error])} type={type} />
                            )}
                            {previewPanelOpen && (
                                <PreviewPanel content={templateContent} subject={templateSubject} styles={templateStyles} onError={(error) => setErrors(prev => [...prev, error])} type={type} />
                            )}
                        </div>
                    </div>
                    {/* Main Editor Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Mobile Editor Toggle */}
                        <div className="lg:hidden border-b border-gray-200 bg-white p-2">
                            <button onClick={() => { setAiPanelOpen(false); setLibraryPanelOpen(false); setStylePanelOpen(false); setPreviewPanelOpen(false); }} className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> 📝 Focus on Editor </button>
                        </div>
                        <AdvancedTemplateEditor content={templateContent} styles={templateStyles} aiEnabled={aiEnabled} onContentChange={handleContentChange} onError={ (error) => setErrors(prev => [...prev, error]) } type={type} />
                        {/* Error Display */}
                        { errors.length > 0 && ( <ErrorHandling errors={errors} onClearErrors={() => setErrors([])} /> )}
                    </div>
                </div>
                {/* Footer */}
                <QuickActionsFooter onSave={handleSave} onCancel={handleClose} isDirty={isDirty} onTest={() => console.log('Testing template')} onExport={() => console.log('Exporting template')} templateContent={templateContent} templateSubject={templateSubject} templateStyles={templateStyles} type={type} />
            </div>
        {/* </div> */}
        </>
    );
};

export default AdvancedEmailTemplateModal;