import React, { useRef, useEffect, useState } from 'react';
import './Template_Page.css';
import EmailEditor from 'react-email-editor';
import '../../../index.css';
import '../Settings/Settings';

function Template_Page({ status }) {
    const editorRef = useRef(null);
    const emailEditorRef = useRef(null);

    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey'));
    const [aiAgent, setAiAgent] = useState(localStorage.getItem('aiAgent') || 'ChatGPT');
    const [aiPrompt, setAiPrompt] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const backendPromptPrefix = `You are an expert email copywriter. Create a structured, persuasive, and professional marketing email in HTML. Here's the user idea:\n\n`;

    const closeModal = () => setShowModal(false);

    const exportHtml = () => {
        emailEditorRef.current?.editor.exportHtml(data => {
            console.log('exported HTML:', data.html);
        });
    };

    const generateAIEmail = async () => {
        const apiKey=localStorage.getItem('apiKey');
        console.log("API Key:", apiKey);
        if (!apiKey) return alert("API Key not found.");
        if (!aiPrompt.trim()) return alert("Enter a prompt.");

        setLoadingAI(true);

        const finalPrompt = backendPromptPrefix + aiPrompt;

        try {
            let url = '', payload = {}, headers = {};

            switch (aiAgent) {
                case 'ChatGPT':
                    url = 'https://api.openai.com/v1/chat/completions';
                    headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`
                    };
                    payload = {
                        model: 'gpt-3.5-turbo',
                        messages: [{ role: 'user', content: finalPrompt }],
                        temperature: 0.7
                    };
                    break;

                case 'Gemini':
                    url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;
                    headers = { 'Content-Type': 'application/json' };
                    payload = {
                        contents: [{ parts: [{ text: finalPrompt }] }]
                    };
                    break;

                case 'Claude':
                    url = 'https://api.anthropic.com/v1/messages';
                    headers = {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                        'anthropic-version': '2023-06-01'
                    };
                    payload = {
                        model: 'claude-3-haiku-20240307',
                        max_tokens: 1024,
                        messages: [{ role: 'user', content: finalPrompt }]
                    };
                    break;

                case 'Llama':
                    url = 'https://api.llama-api.com/chat'; // Replace with actual if different
                    headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`
                    };
                    payload = {
                        model: 'llama-2',
                        messages: [{ role: 'user', content: finalPrompt }]
                    };
                    break;

                default:
                    alert("Unsupported AI Agent selected.");
                    setLoadingAI(false);
                    return;
            }

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            let emailContent = 'AI response failed.';

            if (aiAgent === 'ChatGPT') {
                emailContent = data?.choices?.[0]?.message?.content || emailContent;
            } else if (aiAgent === 'Gemini') {
                emailContent = data?.candidates?.[0]?.content?.parts?.[0]?.text || emailContent;
            } else if (aiAgent === 'Claude') {
                emailContent = data?.content?.[0]?.text || emailContent;
            } else if (aiAgent === 'Llama') {
                emailContent = data?.choices?.[0]?.message?.content || emailContent;
            }

            emailEditorRef.current?.editor.loadDesign({
                body: {
                    rows: [{
                        columns: [{
                            contents: [{
                                type: 'text',
                                values: {
                                    text: `<p>${emailContent.replace(/\n/g, '<br>')}</p>`
                                }
                            }]
                        }]
                    }]
                }
            });

            setAiPrompt('');
        } catch (error) {
            console.error("AI Error:", error);
            alert("AI generation failed. Check console.");
        }

        setLoadingAI(false);
    };

    return (
        <>
            <section id="template_page" className={`page ${status}`}>
                <div className="page-header">
                    <div className="page-title">
                        <h2>Email Template Editor</h2>
                    </div>
                    <button className="modal-close" onClick={closeModal}>&times;</button>
                </div>

                <div className='email-editor-container'>
                    <div className="template-editor-body">
                        <div style={{ marginBottom: '1rem' }}>
                            <textarea
                                placeholder="Enter prompt for AI to generate email..."
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                disabled={!apiKey || loadingAI}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 8 }}
                            />
                            <button
                                onClick={generateAIEmail}
                                className="btn btn-primary"
                                disabled={!apiKey || loadingAI}
                                style={{ marginTop: '0.5rem' }}
                            >
                                {loadingAI ? 'Generating...' : `Generate with ${aiAgent}`}
                            </button>
                            {!apiKey && <p style={{ color: 'red', marginTop: 5 }}>Enter API key to enable AI.</p>}
                        </div>

                        <EmailEditor ref={emailEditorRef} />

                        <button onClick={exportHtml} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                            Export HTML
                        </button>
                    </div>

                    <div className="template-editor-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                        <button type="submit" form="templateForm" className="btn btn-primary">Save Template</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Template_Page;