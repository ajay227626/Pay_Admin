import './Templates.css';
import React, { useState, useEffect } from "react";
import Template_Page from './Template_Page';
import '../../../App';

function Templates({ status }) {
    // Add state and refs for editor
    const [templateName, setTemplateName] = React.useState("");
    const [templateSubject, setTemplateSubject] = React.useState("");
    const [editorHtml, setEditorHtml] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const editorRef = React.useRef(null);
    const [templateList, setTemplateList] = useState(JSON.parse(localStorage.getItem('emailTemplates')));
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [currentId, setCurrentId] = useState(null);

    // Rich text command handler
    const handleCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        setEditorHtml(editorRef.current.innerHTML);
    };
    
    // Delete template function
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
    
    // Show/hide template actions and close when clicking outside
    const templateAction = (event) => {
        event.stopPropagation();
        const templateCard = event.currentTarget.closest('.template-card');
        const templateActions = document.querySelector('.template-actions');
        const templateId = templateCard.getAttribute('data-id');
        if (templateActions) {
            setCurrentId(templateId);
            templateActions.setAttribute('ref-id', templateId);
        }
        const actionIcon = templateCard.querySelector('.btn-action');
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

    // Close all template-actions when clicking outside
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

    // Keep templateList in sync with localStorage changes (e.g., from other tabs)
    useEffect(() => {
        const syncTemplates = () => {
            setTemplateList(JSON.parse(localStorage.getItem('emailTemplates')) || []);
        };
        window.addEventListener('storage', syncTemplates);
        return () => window.removeEventListener('storage', syncTemplates);
    }, []);

    // Function to make a copy of a template
    const makeACopy = (template) => {
        const newTemplate = { ...template, id: Date.now() + Math.random().toString(36).substr(2, 9) };
        const existingTemplates = JSON.parse(localStorage.getItem('emailTemplates')) || [];
        existingTemplates.push(newTemplate);
        localStorage.setItem('emailTemplates', JSON.stringify(existingTemplates));
    };

    // Function to edit a template
    const editTemplate = () => {
        const template = templateList.find(t => t.id === currentId);
        console.log(template, currentId);
        if (template) {
            setTemplateName(template.name);
            setTemplateSubject(template.subject);
            setEditorHtml(template.content);
            setShowModal(true);
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

    // Insert variable at caret
    const insertVariable = (variable) => {
        handleCommand("insertText", variable);
    };

    // Handle modal open/close
    const openModal = () => setShowModal(true);

    // Set editor content when modal opens
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
        setShowModal(false);
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

    return (
        <>
            {/* Templates Page */}
            <section id="templates-page" className={`page ${status}`}>
                <div className="page-header">
                    <div className="page-title">
                        <h2>Email Templates</h2>
                        <p>Create and manage email templates</p>
                    </div>
                    <div className="page-actions">
                        <button className="btn btn-primary" id="newTemplateBtn" onClick={openModal}>
                            <i className="fas fa-plus"></i> New Template
                        </button>
                    </div>
                </div>
                <div className="templates-grid">
                   {
                        templateList && templateList.length > 0 ? (
                            templateList.map((template) =>
                                template.name !== '' ? (
                                    <div className="template-card" key={template.id} data-id={template.id}>
                                        <h3>{template.name}</h3>
                                        <p>{template.subject}</p>
                                        <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", textAlign: "right" }}>
                                            <div className="btn btn-seconsary btn-action" style={{ color: "var(--secondary-color)" }} onClick={templateAction} onBlur={templateAction}>
                                                <i className='bx bx-dots-vertical-rounded'></i>
                                            </div>
                                        </div>
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

            {showModal && (
                document.querySelectorAll('.page').forEach(page => {
                    if (page.id === 'template_page') {
                        page.classList.add('active');
                    } else {
                        page.classList.remove('active');
                    }
                })
            )}
        </>
    );
}

export default Templates;