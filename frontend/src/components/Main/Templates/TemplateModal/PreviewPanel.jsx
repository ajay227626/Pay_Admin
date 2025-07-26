import React, { useState } from 'react';

const PreviewPanel = ({ content, subject, styles, onError }) => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [emailClient, setEmailClient] = useState('gmail');
  const [showRawHTML, setShowRawHTML] = useState(false);

  const emailClients = [
    { value: 'gmail', label: 'Gmail', icon: '📧' },
    { value: 'outlook', label: 'Outlook', icon: '📮' },
    { value: 'apple', label: 'Apple Mail', icon: '📬' },
    { value: 'yahoo', label: 'Yahoo Mail', icon: '📭' },
    { value: 'thunderbird', label: 'Thunderbird', icon: '🦅' }
  ];

  const getPreviewDimensions = () => {
    switch (previewMode) {
      case 'mobile':
        return { width: '320px', height: '568px' };
      case 'tablet':
        return { width: '768px', height: '600px' };
      default:
        return { width: '100%', height: '600px' };
    }
  };

  const getEmailClientStyles = () => {
    const baseStyles = {
      fontFamily: styles.fontFamily,
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
      backgroundColor: styles.backgroundColor,
      color: styles.textColor,
      maxWidth: styles.maxWidth,
      margin: '0 auto',
      padding: '20px'
    };

    switch (emailClient) {
      case 'outlook':
        return {
          ...baseStyles,
          fontFamily: 'Calibri, sans-serif', // Outlook default
          fontSize: '11pt'
        };
      case 'apple':
        return {
          ...baseStyles,
          fontFamily: 'Helvetica, Arial, sans-serif'
        };
      case 'yahoo':
        return {
          ...baseStyles,
          fontFamily: 'Helvetica Neue, Arial, sans-serif'
        };
      default:
        return baseStyles;
    }
  };

  const generateTestEmail = () => {
    const testData = {
      to: 'test@example.com',
      subject: subject || 'Test Email Subject',
      html: content,
      styles: styles
    };
    
    // Simulate sending test email
    console.log('Sending test email:', testData);
    alert('Test email sent! Check your inbox.');
  };

  const exportHTML = () => {
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject || 'Email Template'}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: ${styles.fontFamily};
            font-size: ${styles.fontSize};
            line-height: ${styles.lineHeight};
            background-color: ${styles.backgroundColor};
            color: ${styles.textColor};
        }
        .email-container {
            max-width: ${styles.maxWidth};
            margin: 0 auto;
            padding: 20px;
        }
        a {
            color: ${styles.linkColor};
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${content}
    </div>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject || 'email-template'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sharePreview = () => {
    if (navigator.share) {
      navigator.share({
        title: subject || 'Email Template Preview',
        text: 'Check out this email template preview',
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Preview link copied to clipboard!');
    }
  };

  const dimensions = getPreviewDimensions();
  const clientStyles = getEmailClientStyles();

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center">
          👁️ Live Preview
        </h3>
        <button
          onClick={() => window.location.reload()}
          className="p-1 text-gray-400 hover:text-gray-600 rounded"
          title="Refresh preview"
        >
          <i className="fas fa-sync-alt w-4 h-4" />
        </button>
      </div>

      {/* Preview Controls */}
      <div className="space-y-3">
        {/* Device Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Device Preview</label>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`flex-1 flex items-center justify-center py-1 px-2 rounded text-xs transition-colors ${
                previewMode === 'mobile' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
              }`}
            >
              <i className="fas fa-mobile-alt w-3 h-3 mr-1" />
              Mobile
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`flex-1 flex items-center justify-center py-1 px-2 rounded text-xs transition-colors ${
                previewMode === 'tablet' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
              }`}
            >
              <i className="fas fa-tablet-alt w-3 h-3 mr-1" />
              Tablet
            </button>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`flex-1 flex items-center justify-center py-1 px-2 rounded text-xs transition-colors ${
                previewMode === 'desktop' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
              }`}
            >
              <i className="fas fa-desktop w-3 h-3 mr-1" />
              Desktop
            </button>
          </div>
        </div>

        {/* Email Client Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Email Client</label>
          <select
            value={emailClient}
            onChange={(e) => setEmailClient(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            {emailClients.map(client => (
              <option key={client.value} value={client.value}>
                {client.icon} {client.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowRawHTML(!showRawHTML)}
            className={`flex-1 px-3 py-2 text-xs rounded transition-colors ${
              showRawHTML 
                ? 'bg-orange-100 text-orange-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showRawHTML ? 'Show Preview' : 'Show HTML'}
          </button>
        </div>
      </div>

      {/* Subject Line Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <i className="fas fa-envelope w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-600">Subject Line</span>
        </div>
        <div className="text-sm text-gray-800 font-medium">
          {subject || 'No subject line set'}
        </div>
      </div>

      {/* Preview Area */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Email Client Header Simulation */}
        <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 ml-2">
              {emailClients.find(c => c.value === emailClient)?.label} - {previewMode}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {dimensions.width} × {dimensions.height}
          </div>
        </div>

        {/* Preview Content */}
        <div 
          className="bg-white overflow-auto"
          style={{ 
            width: dimensions.width,
            height: dimensions.height,
            maxWidth: '100%'
          }}
        >
          {showRawHTML ? (
            <pre className="p-4 text-xs text-gray-800 whitespace-pre-wrap overflow-auto h-full">
              {content || 'No content to preview'}
            </pre>
          ) : (
            <div 
              className="h-full overflow-auto"
              style={clientStyles}
              dangerouslySetInnerHTML={{ 
                __html: content || '<p style="text-align: center; color: #666; padding: 40px;">No content to preview</p>' 
              }}
            />
          )}
        </div>
      </div>

      {/* Preview Actions */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <button
            onClick={generateTestEmail}
            className="flex-1 flex items-center justify-center px-3 py-2 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
          >
            <i className="fas fa-paper-plane w-3 h-3 mr-1" />
            Send Test
          </button>
          <button
            onClick={exportHTML}
            className="flex-1 flex items-center justify-center px-3 py-2 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-download w-3 h-3 mr-1" />
            Export
          </button>
        </div>
        
        <button
          onClick={sharePreview}
          className="w-full flex items-center justify-center px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
          <i className="fas fa-share-alt w-3 h-3 mr-1" />
          Share Preview
        </button>
      </div>

      {/* Compatibility Info */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <div className="text-xs text-orange-700">
          <strong>📱 Compatibility:</strong> Preview simulates {emailClients.find(c => c.value === emailClient)?.label} on {previewMode} devices.
        </div>
      </div>

      {/* Preview Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-50 rounded p-2">
          <div className="text-gray-500">Content Size</div>
          <div className="font-medium">{(content?.length || 0)} chars</div>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <div className="text-gray-500">Load Time</div>
          <div className="font-medium">~0.5s</div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;