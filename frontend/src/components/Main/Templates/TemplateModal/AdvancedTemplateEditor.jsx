import React, { useState, useRef, useEffect } from 'react';

const AdvancedTemplateEditor = ({ content, styles, aiEnabled, onContentChange, onError, type }) => {
    const textColor = type === 'edit' ? 'text-cbx-dark' : 'text-gray-400';
    const bgColor = type === 'edit' ? 'bg-cbx-light' : 'bg-gray-200';
    const cursor = type === 'edit' ? 'cursor-pointer' : 'cursor-no-drop';
    const [ editorContent, setEditorContent ] = useState(content);
    const [ selectedText, setSelectedText ] = useState('');
    const [ showColorPicker, setShowColorPicker ] = useState(false);
    const [ showFontPicker, setShowFontPicker ] = useState(false);
    const [ showTableDialog, setShowTableDialog ] = useState(false);
    const [ showLinkDialog, setShowLinkDialog ] = useState(false);
    const [ showImageDialog, setShowImageDialog ] = useState(false);
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);
    const [ currentFontSize, setCurrentFontSize ] = useState('14');
    const [ currentFontFamily, setCurrentFontFamily ] = useState('Arial');
    const [ linkUrl, setLinkUrl ] = useState('');
    const [ linkText, setLinkText ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');
    const [ imageAlt, setImageAlt ] = useState('');
    const [ tableRows, setTableRows ] = useState(3);
    const [ tableCols, setTableCols ] = useState(3);
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = editorContent ? editorContent : '<p>Start typing your email template...</p>';
        }
    }, [editorContent]);
    const editorRef = useRef(null);
    const fontPickerRef = useRef(null);
    const fontPickerBtnRef = useRef(null);
    const fontFamilies = [
        'Arial, sans-serif',
        'Georgia, serif',
        'Times New Roman, serif',
        'Helvetica, sans-serif',
        'Verdana, sans-serif',
        'Courier New, monospace',
        'Trebuchet MS, sans-serif',
        'Tahoma, sans-serif',
        'Impact, sans-serif'
    ];
    const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72'];
    const colors = [
        '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
        '#FF0000', '#FF6600', '#FFCC00', '#00FF00', '#0066FF', '#6600FF',
        '#FF3366', '#FF9933', '#FFFF33', '#33FF33', '#3366FF', '#9933FF',
        '#990000', '#CC3300', '#FF6600', '#009900', '#003399', '#330099'
    ];
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', ' ', '🤮', '🤧', '😷', '🤒', '🤕'];
    useEffect(() => {
        setEditorContent(content);
    }, [content]);
    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        updateContent();
    };
    const updateContent = () => {
        if (editorRef.current) {
            const selection = window.getSelection();
            const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
            let cursorPosition = 0;
            if (range) {
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(editorRef.current);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                cursorPosition = preCaretRange.toString().length;
            }
            const newContent = editorRef.current.innerHTML;
            setEditorContent(newContent);
            onContentChange(newContent);
            setTimeout(() => {
                if (editorRef.current) {
                    const textContent = editorRef.current.textContent || '';
                    const position = Math.min(cursorPosition, textContent.length);
                    const walker = document.createTreeWalker(
                        editorRef.current,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );
                    let currentPosition = 0;
                    let targetNode = null;
                    let targetOffset = 0;
                    while (walker.nextNode()) {
                        const node = walker.currentNode;
                        const nodeLength = node.textContent.length;
                        if (currentPosition + nodeLength >= position) {
                            targetNode = node;
                            targetOffset = position - currentPosition;
                            break;
                        }
                        currentPosition += nodeLength;
                    }
                    if (targetNode) {
                        const newRange = document.createRange();
                        newRange.setStart(targetNode, targetOffset);
                        newRange.setEnd(targetNode, targetOffset);
                        const newSelection = window.getSelection();
                        newSelection.removeAllRanges();
                        newSelection.addRange(newRange);
                    }
                }
            }, 0);
        }
    };
    const insertHTML = (html) => {
        if (editorRef.current) {
            editorRef.current.focus();
            document.execCommand('insertHTML', false, html);
            updateContent();
        }
    };
    const insertLink = () => {
        if (linkUrl && linkText) {
            const linkHTML = `<a href="${linkUrl}" style="color: ${styles.linkColor}; text-decoration: underline;">${linkText}</a>`;
            insertHTML(linkHTML);
            setLinkUrl('');
            setLinkText('');
            setShowLinkDialog(false);
        }
    };
    const insertImage = () => {
        if (imageUrl) {
            const imageHTML = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto; border-radius: 4px;" />`;
            insertHTML(imageHTML);
            setImageUrl('');
            setImageAlt('');
            setShowImageDialog(false);
        }
    };
    const insertTable = () => {
        let tableHTML = '<table style="border-collapse: collapse; width: 100%; margin: 10px 0;">';
        for (let i = 0; i < tableRows; i++) {
            tableHTML += '<tr>';
            for (let j = 0; j < tableCols; j++) {
                tableHTML += '<td style="border: 1px solid #ddd; padding: 8px; min-width: 50px;">&nbsp;</td>';
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</table>';
        insertHTML(tableHTML);
        setShowTableDialog(false);
    };
    const insertEmoji = (emoji) => {
        insertHTML(emoji);
        setShowEmojiPicker(false);
    };
    const changeFontSize = (size) => {
        setCurrentFontSize(size);
        execCommand('fontSize', '7');
        // Apply custom font size
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.style.fontSize = size + 'px';
            try {
                range.surroundContents(span);
            } catch (e) {
                span.appendChild(range.extractContents());
                range.insertNode(span);
            }
            updateContent();
        }
    };
    const changeFontFamily = (family) => {
        setCurrentFontFamily(family);
        execCommand('fontName', family);
    };
    const changeTextColor = (color) => {
        execCommand('foreColor', color);
        setShowColorPicker(false);
    };
    const changeBackgroundColor = (color) => {
        execCommand('hiliteColor', color);
        setShowColorPicker(false);
    };
    const insertTemplate = (templateType) => {
        const templates = {
            header: '<div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-bottom: 2px solid #e9ecef;"><h1 style="margin: 0; color: #333;">Your Company Name</h1><p style="margin: 5px 0 0 0; color: #666;">Professional Email Template</p></div>',
            footer: '<div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-top: 2px solid #e9ecef; margin-top: 20px;"><p style="margin: 0; color: #666; font-size: 12px;">© 2024 Your Company. All rights reserved.</p><p style="margin: 5px 0 0 0;"><a href="#" style="color: #007bff; text-decoration: none; margin: 0 10px;">Unsubscribe</a><a href="#" style="color: #007bff; text-decoration: none; margin: 0 10px;">Privacy Policy</a></p></div>',
            button: '<div style="text-align: center; margin: 20px 0;"><a href="#" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Call to Action</a></div>',
            divider: '<hr style="border: none; height: 1px; background-color: #e9ecef; margin: 20px 0;" />',
            signature: '<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;"><p style="margin: 0;"><strong>Best regards,</strong></p><p style="margin: 5px 0;">Your Name</p><p style="margin: 0; color: #666; font-size: 12px;">Your Title | Your Company</p><p style="margin: 0; color: #666; font-size: 12px;">Email: your.email@company.com | Phone: (555) 123-4567</p></div>'
        };
        if (templates[templateType]) {
            insertHTML(templates[templateType]);
        }
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (fontPickerRef.current && fontPickerBtnRef.current && !fontPickerRef.current.contains(e.target) && !fontPickerBtnRef.current.contains(e.target)) {
                setShowFontPicker(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => { document.removeEventListener('click', handleClickOutside); };
    }, [showFontPicker]);

    return (
        <div className="relative flex-1 flex flex-col bg-white">
            {/* Advanced Toolbar */}
            <div className="border-b border-gray-200 bg-gray-50 overflow-x-auto">
                {/* First Row - Basic Formatting */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 py-1 border-b border-gray-200 space-y-2 sm:space-y-0">
                    { type === 'edit'&& (
                        <div className={`flex items-center space-x-1 overflow-x-auto w-full sm:w-auto`}>
                            {/* Undo/Redo */}
                            <button onClick={() => execCommand('undo')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0 ${cursor}`} title="Undo"><i className="fas fa-undo w-4 h-4" /></button>
                            <button onClick={() => execCommand('redo')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0 ${cursor}`} title="Redo"><i className="fas fa-redo w-4 h-4" /></button>
                            <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 flex-shrink-0" />
                            {/* Font Family */}
                            <div className="flex-shrink-0">
                                <button id='font-picker-button' ref={fontPickerBtnRef} onClick={() => setShowFontPicker(!showFontPicker)} className={`flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded hover:${bgColor} transition-colors ${cursor}`} disabled={type !== 'edit'}>
                                    <i className="fas fa-font w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">{currentFontFamily.split(',')[0]}</span>
                                    <span className="sm:hidden">Font</span>
                                    <i className="fas fa-chevron-down w-3 h-3 ml-2" />
                                </button>
                                {showFontPicker && (
                                    <div
                                        className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-48 max-h-48 overflow-y-auto"
                                        id='font-picker' ref={fontPickerRef}
                                    >
                                        {fontFamilies.map(font => (
                                            <button
                                                key={font}
                                                onClick={() => {
                                                    changeFontFamily(font);
                                                    setShowFontPicker(false);
                                                }}
                                                className="block w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-cbx-light transition-colors"
                                                style={{ fontFamily: font }}
                                            >
                                                {font.split(',')[0]}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Font Size */}
                            <select value={currentFontSize} onChange={(e) => changeFontSize(e.target.value)} className="px-1 sm:px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0" disabled={type !== 'edit'}>
                                {fontSizes.map(size => (
                                    <option key={size} value={size}>{size}px</option>
                                ))}
                            </select>
                            <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 flex-shrink-0" />
                            {/* Text Formatting */}
                            <button onClick={() => execCommand('bold')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Bold"><i className="fas fa-bold w-4 h-4" /></button>
                            <button onClick={() => execCommand('italic')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Italic"><i className="fas fa-italic w-4 h-4" /></button>
                            <button onClick={() => execCommand('underline')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Underline"><i className="fas fa-underline w-4 h-4" /></button>
                            <button onClick={() => execCommand('strikeThrough')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Strikethrough"><i className="fas fa-strikethrough w-4 h-4" /></button>
                            <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 flex-shrink-0" />
                            {/* Color Picker */}
                            <div className="flex-shrink-0">
                                <button onClick={() => setShowColorPicker(!showColorPicker)} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors`} title="Text Color"><i className="fas fa-palette w-4 h-4" /></button>
                                {showColorPicker && (
                                    <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-3 max-w-xs">
                                        <div className={`mb-2 text-xs font-medium ${textColor}`}>Text Color</div>
                                        <div className="grid grid-cols-6 gap-1 mb-3">
                                            {colors.map(color => (
                                                <button key={color + 1} onClick={() => changeTextColor(color + 1)}
                                                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                                                    style={{ backgroundColor: color }} title={color}
                                                />
                                            ))}
                                        </div>
                                        <div className={`mb-2 text-xs font-medium ${textColor}`}>Background Color</div>
                                        <div className="grid grid-cols-6 gap-1">
                                            {colors.map(color => (
                                                <button key={`bg-${color}`} onClick={() => changeBackgroundColor(color)}
                                                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                                                    style={{ backgroundColor: color }} title={color}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {/* Right Side Tools */}
                    <div className="flex items-center space-x-1 flex-shrink-0">
                        <button onClick={() => setEditorContent('')} className={`p-1.5 sm:py-1 sm:px-2 text-cbx-dark hover:text-gray-800 hover:bg-cbx-light rounded transition-colors`} title="Clear"><i className="fas fa-eraser w-4 h-4" /></button>
                        <button onClick={() => {
                            navigator.clipboard.writeText(editorContent);
                        }} className={`p-1.5 sm:py-1 sm:px-2 text-cbx-dark hover:text-gray-800 hover:bg-cbx-light rounded transition-colors`} title="Copy"><i className="fas fa-copy w-4 h-4" /></button>
                        <button className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors ${cursor}`} title="Paste"><i className="fas fa-paste w-4 h-4" /></button>
                        <button className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors ${cursor}`} title="Cut"><i className="fas fa-scissors w-4 h-4" /></button>
                    </div>
                </div>
                {/* Second Row - Alignment and Lists */}
                { type === 'edit'&& (
                    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 py-1 space-y-2 sm:space-y-0`}>
                        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
                            {/* Alignment */}
                            <button onClick={() => execCommand('justifyLeft')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Align Left"><i className="fas fa-align-left w-4 h-4" /></button>
                            <button onClick={() => execCommand('justifyCenter')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Align Center"><i className="fas fa-align-center w-4 h-4" /></button>
                            <button onClick={() => execCommand('justifyRight')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Align Right"><i className="fas fa-align-right w-4 h-4" /></button>
                            <button onClick={() => execCommand('justifyFull')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Justify"><i className="fas fa-align-justify w-4 h-4" /></button>
                            <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 flex-shrink-0" />
                            {/* Lists */}
                            <button onClick={() => execCommand('insertUnorderedList')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Bullet List"><i className="fas fa-list w-4 h-4" /></button>
                            <button onClick={() => execCommand('insertOrderedList')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Numbered List"><i className="fas fa-list-ol w-4 h-4" /></button>
                            <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 flex-shrink-0" />
                            {/* Insert Elements */}
                            <button onClick={() => setShowLinkDialog(true)} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Insert Link"><i className="fas fa-link w-4 h-4" /></button>
                            <button onClick={() => setShowImageDialog(true)} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Insert Image"><i className="fas fa-image w-4 h-4" /></button>
                            <button onClick={() => setShowTableDialog(true)} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Insert Table"><i className="fas fa-table w-4 h-4" /></button>
                            <button onClick={() => execCommand('formatBlock', 'blockquote')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Quote"><i className="fas fa-quote-right w-4 h-4" /></button>
                            <button onClick={() => execCommand('formatBlock', 'pre')} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors flex-shrink-0`} title="Code Block"><i className="fas fa-code w-4 h-4" /></button>
                            <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 flex-shrink-0" />
                            {/* Emoji Picker */}
                            <div className="relative flex-shrink-0">
                                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`p-1.5 sm:py-1 sm:px-2 ${textColor} hover:text-gray-800 hover:${bgColor} rounded transition-colors`} title="Insert Emoji"><i className="fas fa-smile w-4 h-4" /></button>
                                {showEmojiPicker && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-3 w-48 sm:w-64">
                                        <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto">
                                            {emojis.map((emoji, index) => (
                                                <button key={index} onClick={() => insertEmoji(emoji)} className={`p-1 hover:${bgColor} rounded text-lg`}>{emoji}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Template Blocks */}
                        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
                            <span className="text-xs text-gray-500 mr-1 sm:mr-2 flex-shrink-0 hidden sm:inline">Quick Insert:</span>
                            <button onClick={() => insertTemplate('header')} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex-shrink-0"> Header </button>
                            <button onClick={() => insertTemplate('button')} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors flex-shrink-0"> Button </button>
                            <button onClick={() => insertTemplate('footer')} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors flex-shrink-0"> Footer </button>
                            <button onClick={() => insertTemplate('signature')} className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors flex-shrink-0"> Signature </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Editor Content */}
            <div className="flex-1 relative">
                <div ref={editorRef} contentEditable
                    className="w-full h-full p-3 sm:p-6 text-gray-800 focus:outline-none overflow-y-auto touch-manipulation"
                        style={{ minHeight: '300px', fontFamily: styles.fontFamily, fontSize: styles.fontSize, lineHeight: styles.lineHeight, backgroundColor: styles.backgroundColor, color: styles.textColor, direction: 'ltr' }} 
                        onInput={updateContent}
                        onKeyUp={() => {
                            const selection = window.getSelection();
                            if (selection.toString()) setSelectedText(selection.toString());
                        }}
                    />
                {/* AI Suggestions Overlay */}
                {aiEnabled && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-48 sm:w-64">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">✨ AI Suggestions</h4>
                        <div className="space-y-2">
                            <button className={`w-full text-left px-2 py-1 text-xs ${textColor} hover:bg-blue-50 hover:text-blue-700 rounded transition-colors`}> Make this more engaging </button>
                            <button className={`w-full text-left px-2 py-1 text-xs ${textColor} hover:bg-blue-50 hover:text-blue-700 rounded transition-colors`}> Improve readability </button>
                            <button className={`w-full text-left px-2 py-1 text-xs ${textColor} hover:bg-blue-50 hover:text-blue-700 rounded transition-colors`}> Add call to action </button>
                            <button className={`w-full text-left px-2 py-1 text-xs ${textColor} hover:bg-blue-50 hover:text-blue-700 rounded transition-colors`}> Check grammar </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Link Dialog */}
            {showLinkDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Link Text</label>
                                <input type="text" value={linkText} onChange={(e) => setLinkText(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Click here" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                <input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://example.com" />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button onClick={() => setShowLinkDialog(false)} className={`px-3 sm:px-4 py-2 text-sm ${textColor} border border-gray-300 rounded-lg hover:${bgColor}`}> Cancel </button>
                                <button onClick={insertLink} className="px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"> Insert Link </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Image Dialog */}
            {showImageDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                                <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Image description" />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button onClick={() => setShowImageDialog(false)} className={`px-3 sm:px-4 py-2 text-sm ${textColor} border border-gray-300 rounded-lg hover:${bgColor}`}> Cancel </button>
                                <button onClick={insertImage} className="px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"> Insert Image </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Table Dialog */}
            {showTableDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Insert Table</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
                                <input type="number" value={tableRows} onChange={(e) => setTableRows(parseInt(e.target.value) || 1)} min="1" max="20" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
                                <input type="number" value={tableCols} onChange={(e) => setTableCols(parseInt(e.target.value) || 1)} min="1" max="10" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button onClick={() => setShowTableDialog(false)} className={`px-3 sm:px-4 py-2 text-sm ${textColor} border border-gray-300 rounded-lg hover:${bgColor}`}> Cancel </button>
                                <button onClick={insertTable} className="px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"> Insert Table </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Content Stats */}
            <div className="border-t border-gray-200 bg-gray-50 px-3 sm:px-6 py-2 sm:py-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <span>Characters: {editorContent?.replace(/<[^>]*>/g, '').length}</span>
                        <span>Words: {editorContent?.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length}</span>
                        <span className="hidden sm:inline">Reading time: ~{Math.ceil(editorContent?.replace(/<[^>]*>/g, '').split(' ').length / 200)} min</span>
                    </div>
                    { type === 'edit' && (
                        <div className="flex items-center space-x-2">
                            <span>Auto-save: On</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvancedTemplateEditor;