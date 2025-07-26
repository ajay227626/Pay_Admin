import './templates.css';
import React, { useState, useEffect } from "react";
import AdvancedEmailTemplateModal from './TemplateModal/AdvancedEmailTemplateModal'
import '../../../App';
import { useSettings, useModal, useEmailTemplates } from '../../SettingsProvider/SettingsProvider';

function Templates({ status, role = "Minion" }) {
    const isAdmin = role === "Minion";
    const { userSetting, permissionSettings } = useSettings();
    const permission = permissionSettings['templates-page']?.[role];
    const [ templateName, setTemplateName ] = useState("");
    const [ templateSubject, setTemplateSubject ] = useState("");
    const [ editorHtml, setEditorHtml ] = useState("");
    const { showModal, closeModal } = useModal();
    const [ templateList, setTemplateList ] = useState(JSON.parse(localStorage.getItem('emailTemplates')));
    const [ selectedTemplate, setSelectedTemplate ] = useState(null);
    const [ currentId, setCurrentId ] = useState(null);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const editorRef = React.useRef(null);
    const { emailTemplates, setEmailTemplates } = useEmailTemplates();

    const handleCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        setEditorHtml(editorRef.current.innerHTML);
    };
    const deleteTemplate = (templateId) => {
        const existingTemplates = JSON.parse(localStorage.getItem('emailTemplates')) || [];
        const updatedTemplates = existingTemplates.filter(template => template.id !== templateId);
        localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
        const templateCard = document.querySelector(`.template-card[data-id="${templateId}"]`);
        if (templateCard) {
            templateCard.remove();
        }
        alert("Template deleted successfully!");
    };
    const insertAtCaret = (text) => {
        const editor = editorRef.current;
        if (editor) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const textNode = document.createTextNode(text);
            range.deleteContents(); // Remove any selected text
            range.insertNode(textNode); // Insert the new text node
            // Move the caret after the inserted text
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges(); // Clear any existing selections
            selection.addRange(range); // Set the new range
        }
    };
    const templateAction = (event) => {
        event.stopPropagation();
        const templateCard = event.currentTarget.closest('.template-card');
        const templateActions = document.querySelector('.template-actions');
        const templateId = templateCard.getAttribute('data-id');
        if (templateActions) {
            setCurrentId(templateId);
            templateActions.setAttribute('ref-id', templateId);
        }
        const actionIcon = templateCard.querySelector('.template-card > div > div');
        const rect = actionIcon.getBoundingClientRect();
        templateActions.style.top = `${rect.bottom + window.scrollY + 3}px`;
        // Get the sidebar width from CSS variable
        const sidebar = document.querySelector('.sidebar');
        let sidebarWidth = 260;
        if (sidebar) {
            if (sidebar.classList.contains('collapsed')) sidebarWidth = sidebar.offsetWidth * 0.25;
            else sidebarWidth = sidebar.offsetWidth;
        }
        templateActions.style.left = `${rect.left + window.scrollX - 120 - sidebarWidth}px`;
        templateActions.style.zIndex = 10;
        templateActions.classList.toggle('active');
        actionIcon.classList.toggle('active');
        // Close other actions if any are open
        const otherActions = document.querySelectorAll('.template-actions.active');
        otherActions.forEach(action => {
            if (action !== templateActions) action.classList.remove('active');
        });
        const otherIcons = document.querySelectorAll('.btn-action.active');
        otherIcons.forEach(icon => {
            if (icon !== actionIcon) icon.classList.remove('active');
        });
        // Close the actions when clicking outside
        document.addEventListener('click', (e) => {
            if (!templateCard.contains(e.target)) {
                templateActions.classList.remove('active');
                actionIcon.classList.remove('active');
            }
        }, { once: true });
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            const actions = document.querySelectorAll('.template-actions.active');
            const actionIcons = document.querySelectorAll('.btn-action.active');
            actions.forEach(action => { if (!action.contains(event.target)) action.classList.remove('active'); });
            actionIcons.forEach(icon => { if (!icon.contains(event.target)) icon.classList.remove('active'); });
        };
        const handleResize = () => {
            const actions = document.querySelectorAll('.template-actions.active');
            const actionIcons = document.querySelectorAll('.btn-action.active');
            actions.forEach(action => {
                action.classList.remove('active');
            });
            actionIcons.forEach(icon => {
                icon.classList.remove('active');
            });
        };
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', handleResize);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleResize);
         };
    }, []);
    useEffect(() => {
        const syncTemplates = () => {
            setTemplateList(JSON.parse(localStorage.getItem('emailTemplates')) || []);
        };
        window.addEventListener('storage', syncTemplates);
        return () => window.removeEventListener('storage', syncTemplates);
    }, []);
    const makeACopy = (template) => {
        const newTemplate = { ...template, id: Date.now() + Math.random().toString(36).substr(2, 9) };
        const existingTemplates = JSON.parse(localStorage.getItem('emailTemplates')) || [];
        existingTemplates.push(newTemplate);
        localStorage.setItem('emailTemplates', JSON.stringify(existingTemplates));
    };
    const editTemplate = () => {
        const template = templateList.find(t => t.id === currentId);
        console.log(template, currentId);
        if (template) {
            setTemplateName(template.name);
            setTemplateSubject(template.subject);
            setEditorHtml(template.content);
            // setShowModal(true);
        }
    };
    const handleInsertVariable = (variable) => {
        if (editorRef.current && document.activeElement === editorRef.current) {
            insertAtCaret(variable); // Insert variable at caret position
        } else {
            const editor = editorRef.current;
            if (editor) {
                editor.focus(); // Focus the editor
                insertAtCaret(variable); // Insert variable at caret position
            }
        }
    };
    const insertVariable = (variable) => {
        handleCommand("insertText", variable);
    };
    useEffect(() => {
        if (showModal && editorRef.current) {
            editorRef.current.innerHTML = editorHtml || "";
        }
    }, [showModal]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!templateName || !templateSubject || !editorHtml) {
            alert("Please fill in all required fields.");
            return;
        }
        console.log("Template Name:", templateName);
        console.log("Template Subject:", templateSubject);
        console.log("Template Content:", editorHtml);
        setTemplateName("");
        setTemplateSubject("");
        setEditorHtml("");
        // setShowModal(false);
        if (editorRef.current) editorRef.current.innerHTML = "";
        const newTemplate = {
            id: Date.now() + Math.random().toString(36).substr(2, 9), // Generate a unique ID
            name: templateName,
            subject: templateSubject,
            content: editorHtml
        };
        const existingTemplates = JSON.parse(localStorage.getItem('emailTemplates')) || [];
        existingTemplates.push(newTemplate);
        localStorage.setItem('emailTemplates', JSON.stringify(existingTemplates));
        const templatesGrid = document.getElementById("templatesGrid");
        if (!templatesGrid) {
            console.error("Templates grid element not found");
            return;
        }
        const templateCard = document.createElement("div");
        templateCard.className = "template-card";
        templateCard.innerHTML = `
            <h3>${newTemplate.name}</h3>
            <p>${newTemplate.subject}</p>
            <div class="btn btn-secondary btn-action" style="color: var(--secondary-color)" onclick="templateAction()"><i class='bx bx-dots-vertical-rounded'></i>
            </div>
        `;
        templateCard.setAttribute("data-id", newTemplate.id);
        templatesGrid.appendChild(templateCard);
        alert("Template saved successfully!");
        setTemplateName("");
        setTemplateSubject("");
        setEditorHtml("");
        // Reset the editor content
        if (editorRef.current) editorRef.current.innerHTML = "";
        // Close the modal
        closeModal();
    };
    const handleSave = (data) => {
        setIsModalOpen(false);
    };
    const openTemplateModal = (mType) => {
        showModal(
            'New Template',
            '90rem',
            <AdvancedEmailTemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} type={mType} />,
            closeModal,
            "Cancel",
        )
    }
    const handleSouwBtn = (e) => {
        const isMouseEnter = e.type === 'mouseenter';
        const el = e.target.closest('.template-card');
        if (!el) return;
        const eyeButton = el.querySelector('button');
        const dotsDiv = el.querySelector('.bx-dots-vertical-rounded')?.closest('div');
        if (isMouseEnter) {
            if (eyeButton) eyeButton.classList.remove('text-white');
            if (dotsDiv) dotsDiv.classList.remove('text-white');
        } else {
            if (eyeButton) eyeButton.classList.add('text-white');
            if (dotsDiv) dotsDiv.classList.add('text-white');
        }
    };

    return (
        <>
            {/* Templates Page */}
            <section id="templates-page" className={`page ${ status }`}>
                <div className="page-header">
                    <div className="page-title">
                        <h2>Email Templates</h2>
                        <p>Create and manage email templates</p>
                    </div>
                    {( isAdmin || permission === 'add' ) && (
                        <div className="page-actions">
                            <button className="btn btn-primary" id="newTemplateBtn" onClick={() => openTemplateModal('edit')}>
                                <i className="fas fa-plus"></i> New Template
                            </button>
                        </div>
                    )}
                </div>
                <div className={emailTemplates.length > 0 ? `templates-grid` : ''}>
                   {
                        emailTemplates && emailTemplates.length > 0 ? (
                            emailTemplates.map((template) =>
                                template.name !== '' ? (
                                    <div className="template-card relative" key={template.id || 1} data-id={template.id || 1} onMouseEnter={handleSouwBtn} onMouseLeave={handleSouwBtn}>
                                        <h3>{template.name}</h3>
                                        <p className="hidden">{template.category}</p>
                                        <p>{template.subject}</p>
                                        <div className='absolute top-2 right-2'>
                                            <div className="hover:text-cbx-dark hover:bg-cbx-light py-2 px-2 rounded-full hover:cursor-pointer hover:bold flex items-center justify-center" onClick={templateAction} onBlur={templateAction}>
                                                <i className='bx bx-dots-vertical-rounded'></i>
                                            </div>
                                        </div>
                                        <div className='absolute top-3 right-12' onClick={() => openTemplateModal('view')}><button className='border-0 hover:text-cbx-dark'><i className='fa fa-eye'></i></button></div>
                                        <p className="hidden">{template.downloads}</p>
                                        <p className="hidden">{template.createdOn}</p>
                                    </div>
                                ) : ''
                            )
                        ) : (
                            <p>No templates available. Click "New Template" to create one.</p>
                        )
                   }
                </div>
            </section>
            <div className="template-actions" ref-id="">
                <div className="template-actions-arrow" />
                <div className="template-action" onClick={editTemplate}><><i className="fas fa-pencil"></i>Edit</></div>
                <div className="template-action" onClick={deleteTemplate}><><i className="fas fa-trash"></i>Delete</></div>
                <div className="template-action" onClick={makeACopy}><><i className="fas fa-copy"></i>Duplicate</></div>
            </div>

            {/* {showModal && (
                document.querySelectorAll('.page').forEach(page => {
                    if (page.id === 'templates-page') page.classList.add('active');
                    else page.classList.remove('active');
                })
            )} */}
            {/* <AdvancedEmailTemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} templateData={{ name: 'Welcome Email', content: '<h1>Welcome to our platform!</h1><p>We\'re excited to have you on board.</p>' }} /> */}
        </>
    );
}

export default Templates;