import React, { useState } from 'react';
import { Palette, Type, Layout, Smartphone, Monitor, Tablet, Eye, RotateCcw } from 'lucide-react';

const StyleCustomization = ({ styles, onStyleChange, onError }) => {
  const [activeTab, setActiveTab] = useState('typography');
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const fontFamilies = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
    { value: 'Tahoma, sans-serif', label: 'Tahoma' }
  ];

  const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
  const lineHeights = ['1.2', '1.4', '1.5', '1.6', '1.8', '2.0'];
  const maxWidths = ['500px', '600px', '700px', '800px', '100%'];

  const colorPresets = [
    { name: 'Professional Blue', bg: '#ffffff', text: '#333333', link: '#1a73e8', accent: '#4285f4' },
    { name: 'Elegant Black', bg: '#ffffff', text: '#000000', link: '#0066cc', accent: '#333333' },
    { name: 'Warm Orange', bg: '#fef7f0', text: '#333333', link: '#e67e22', accent: '#f39c12' },
    { name: 'Fresh Green', bg: '#f0fff4', text: '#2d3748', link: '#38a169', accent: '#48bb78' },
    { name: 'Royal Purple', bg: '#faf5ff', text: '#2d3748', link: '#805ad5', accent: '#9f7aea' },
    { name: 'Modern Gray', bg: '#f7fafc', text: '#2d3748', link: '#4a5568', accent: '#718096' }
  ];

  const handleStyleUpdate = (property, value) => {
    const newStyles = { ...styles, [property]: value };
    onStyleChange(newStyles);
  };

  const applyColorPreset = (preset) => {
    const newStyles = {
      ...styles,
      backgroundColor: preset.bg,
      textColor: preset.text,
      linkColor: preset.link
    };
    onStyleChange(newStyles);
  };

  const resetToDefaults = () => {
    const defaultStyles = {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      lineHeight: '1.5',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      linkColor: '#1a73e8',
      maxWidth: '600px'
    };
    onStyleChange(defaultStyles);
  };

  const tabs = [
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Layout }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center">
          🎨 Style Customization
        </h3>
        <button
          onClick={resetToDefaults}
          className="p-1 text-gray-400 hover:text-gray-600 rounded"
          title="Reset to defaults"
        >
          <i className="fas fa-sync-alt w-4 h-4" />
        </button>
      </div>

      {/* Device Preview Toggle */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setPreviewDevice('mobile')}
          className={`flex-1 flex items-center justify-center py-1 px-2 rounded text-xs transition-colors ${previewDevice === 'mobile' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
            }`}
        >
          <i className="fas fa-mobile-alt w-3 h-3 mr-1" />
          Mobile
        </button>
        <button
          onClick={() => setPreviewDevice('tablet')}
          className={`flex-1 flex items-center justify-center py-1 px-2 rounded text-xs transition-colors ${previewDevice === 'tablet' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
            }`}
        >
          <i className="fas fa-tablet-alt w-3 h-3 mr-1" />
          Tablet
        </button>
        <button
          onClick={() => setPreviewDevice('desktop')}
          className={`flex-1 flex items-center justify-center py-1 px-2 rounded text-xs transition-colors ${previewDevice === 'desktop' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
            }`}
        >
          <i className="fas fa-desktop w-3 h-3 mr-1" />
          Desktop
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center py-2 px-3 text-xs font-medium transition-colors ${activeTab === tab.id
                  ? 'text-green-700 border-b-2 border-green-500'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <Icon className="w-3 h-3 mr-1" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-4">
            {/* Font Family */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Font Family</label>
              <select
                value={styles.fontFamily}
                onChange={(e) => handleStyleUpdate('fontFamily', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {fontFamilies.map(font => (
                  <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Font Size</label>
              <select
                value={styles.fontSize}
                onChange={(e) => handleStyleUpdate('fontSize', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {fontSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Line Height</label>
              <select
                value={styles.lineHeight}
                onChange={(e) => handleStyleUpdate('lineHeight', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {lineHeights.map(height => (
                  <option key={height} value={height}>{height}</option>
                ))}
              </select>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-2">Typography Preview</div>
              <div
                style={{
                  fontFamily: styles.fontFamily,
                  fontSize: styles.fontSize,
                  lineHeight: styles.lineHeight,
                  color: styles.textColor
                }}
              >
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>Sample Heading</h3>
                <p style={{ margin: '0 0 8px 0' }}>This is a sample paragraph to demonstrate how your typography settings will look in the email template.</p>
                <a href="#" style={{ color: styles.linkColor, textDecoration: 'underline' }}>Sample Link</a>
              </div>
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-4">
            {/* Color Presets */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Color Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyColorPreset(preset)}
                    className="p-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: preset.bg }} />
                        <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: preset.text }} />
                        <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: preset.link }} />
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-800">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Colors */}
            <div className="space-y-3">
              {/* Background Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Background Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={styles.backgroundColor}
                    onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.backgroundColor}
                    onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Text Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={styles.textColor}
                    onChange={(e) => handleStyleUpdate('textColor', e.target.value)}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.textColor}
                    onChange={(e) => handleStyleUpdate('textColor', e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Link Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Link Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={styles.linkColor}
                    onChange={(e) => handleStyleUpdate('linkColor', e.target.value)}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.linkColor}
                    onChange={(e) => handleStyleUpdate('linkColor', e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Color Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-2">Color Preview</div>
              <div
                className="p-3 rounded border"
                style={{
                  backgroundColor: styles.backgroundColor,
                  color: styles.textColor,
                  fontFamily: styles.fontFamily
                }}
              >
                <p style={{ margin: '0 0 8px 0' }}>Sample text with current colors</p>
                <a href="#" style={{ color: styles.linkColor, textDecoration: 'underline' }}>Sample link</a>
              </div>
            </div>
          </div>
        )}

        {/* Layout Tab */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            {/* Max Width */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Email Width</label>
              <select
                value={styles.maxWidth}
                onChange={(e) => handleStyleUpdate('maxWidth', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {maxWidths.map(width => (
                  <option key={width} value={width}>{width}</option>
                ))}
              </select>
            </div>

            {/* Responsive Settings */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-gray-700">Responsive Settings</h4>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <i className="fas fa-mobile w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-xs font-medium text-blue-800">Mobile Optimization</span>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Auto-scale images
                  </label>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Stack columns on mobile
                  </label>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Increase touch targets
                  </label>
                </div>
              </div>
            </div>

            {/* Layout Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-2">Layout Preview ({previewDevice})</div>
              <div className="bg-white border rounded p-2">
                <div
                  className="mx-auto border-2 border-dashed border-gray-300 p-2 text-center"
                  style={{
                    maxWidth: previewDevice === 'mobile' ? '320px' :
                      previewDevice === 'tablet' ? '480px' :
                        styles.maxWidth,
                    fontSize: previewDevice === 'mobile' ? '12px' : '14px'
                  }}
                >
                  <div className="text-xs text-gray-500">Email Content Area</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {previewDevice === 'mobile' ? '320px width' :
                      previewDevice === 'tablet' ? '480px width' :
                        styles.maxWidth + ' width'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Style Export/Import */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
            Export Styles
          </button>
          <button className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
            Import Styles
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="text-xs text-green-700">
          <strong>💡 Pro Tip:</strong> Test your email design across different devices and email clients for best compatibility.
        </div>
      </div>
    </div>
  );
};

export default StyleCustomization;