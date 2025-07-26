import React, { useState } from 'react';

const AIConfigurationPanel = ({ onConfigChange, onError, onContentSuggestion }) => {
  const [apiKey, setApiKey] = useState('');
  const [ apiConfigurationCollapsed, setApiConfigurationCollapsed ] = useState(true);
  const [ usageStatisticsCollapsed, setUsageStatisticsCollapsed ] = useState(true);
  const [ aiContentGeneratorCollapsed, setAiContentGeneratorCollapsed ] = useState(true);
  const [ smartFeaturesCollapsed, setSmartFeaturesCollapsed ] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [usageCredits, setUsageCredits] = useState(150);
  const [maxCredits] = useState(1000);
  const [suggestions] = useState([
    'Write a welcome email for new users',
    'Create a product launch announcement',
    'Generate a newsletter template',
    'Write a thank you email',
    'Create an event invitation',
    'Generate a promotional email'
  ]);

  const handleCollapsed = (type) => {
    const el = document.getElementById(type);
    switch(type) {
      case 'apiConfiguration':
        setApiConfigurationCollapsed(!apiConfigurationCollapsed);
        el.classList.toggle('hidden');
        break;
      case 'usageStatistics':
        setUsageStatisticsCollapsed(!usageStatisticsCollapsed);
        el.classList.toggle('hidden');
        break;
      case 'aiContentGenerator':
        setAiContentGeneratorCollapsed(!aiContentGeneratorCollapsed);
        el.classList.toggle('hidden');
        break;
      case 'smartFeatures':
        setSmartFeaturesCollapsed(!smartFeaturesCollapsed);
        el.classList.toggle('hidden');
        break;
    }
  }

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      onError('Please enter your API key');
      return;
    }

    setIsConnecting(true);
    
    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      onConfigChange();
    } catch (error) {
      onError('Failed to connect to AI service');
    } finally {
      setIsConnecting(false);
    }
  };

  const generateContent = (prompt) => {
    // Simulate AI content generation
    const templates = {
      'Write a welcome email for new users': `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 30px 20px; background-color: #f8f9fa;">
            <h1 style="color: #333; margin: 0;">Welcome to Our Platform! 🎉</h1>
            <p style="color: #666; margin: 10px 0 0 0;">We're thrilled to have you join our community</p>
          </div>
          <div style="padding: 30px 20px;">
            <p>Hi there,</p>
            <p>Welcome aboard! We're excited to have you as part of our growing community.</p>
            <p>Here's what you can do next:</p>
            <ul>
              <li>Complete your profile setup</li>
              <li>Explore our features and tools</li>
              <li>Connect with other members</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Get Started</a>
            </div>
            <p>If you have any questions, we're here to help!</p>
            <p>Best regards,<br>The Team</p>
          </div>
        </div>
      `,
      'Create a product launch announcement': `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px;">🚀 Big News!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Our latest product is finally here</p>
          </div>
          <div style="padding: 30px 20px;">
            <h2 style="color: #333;">Introducing [Product Name]</h2>
            <p>After months of development, we're excited to announce the launch of our revolutionary new product that will transform the way you work.</p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #333;">Key Features:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Advanced automation capabilities</li>
                <li>Seamless integration with existing tools</li>
                <li>Enhanced security and privacy</li>
              </ul>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="display: inline-block; background-color: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Learn More</a>
            </div>
          </div>
        </div>
      `
    };
    
    const content = templates[prompt] || `<p>AI-generated content for: ${prompt}</p>`;
    onContentSuggestion(content);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <i className="fas fa-brain w-5 h-5 mr-2 text-blue-600" />
          AI Assistant
        </h2>
        {isConnected && (
          <div className="flex items-center text-green-600 text-sm">
            <i className="fas fa-circle-check w-4 h-4 mr-1" />
            Connected
          </div>
        )}
      </div>

      {/* API Key Configuration */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center justify-between">
          <span>
            <i className="fas fa-key w-4 h-4 mr-2 text-orange-600" />
            API Configuration
          </span>
          <span onClick={() => handleCollapsed('apiConfiguration')} className="border border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-full px-2 py-1 cursor-pointer">
            { apiConfigurationCollapsed ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" /> }
          </span>
        </h3>
        <div className="space-y-2" id='apiConfiguration'>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? <i class="fas fa-eye-slash w-4 h-4" /> : <i className="fas fa-eye w-4 h-4" />}
            </button>
          </div>
          <button
            onClick={handleConnect}
            disabled={isConnecting || isConnected}
            className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : isConnected ? (
              <>
                <i className="fas fa-circle-check w-4 h-4 mr-2" />
                Connected
              </>
            ) : (
              'Connect'
            )}
          </button>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="space-y-3">
        <h3 className="flex text-sm font-semibold text-gray-800 justify-between">
          <span>
            <i className="fas fa-chart-line w-4 h-4 mr-2 text-purple-600" />
            Usage Statistics
          </span>
          <span onClick={() => handleCollapsed('usageStatistics')} className="border border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-full px-2 py-1 cursor-pointer">
            { usageStatisticsCollapsed ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" /> }
          </span>
        </h3>
        <div className="space-y-2" id='usageStatistics'>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Credits Used</span>
            <span>{usageCredits} / {maxCredits}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(usageCredits / maxCredits) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI Content Generator */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center flex justify-between">
          <span>
            <i className="fas fa-bolt text-blue-500 w-4 h-4 mr-2" />
            AI Content Generator
          </span>
          <span onClick={() => handleCollapsed('aiContentGenerator')} className="border border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-full px-2 py-1 cursor-pointer">
            { aiContentGeneratorCollapsed ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" /> }
          </span>
        </h3>
        <div className="space-y-2" id='aiContentGenerator'>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => generateContent(suggestion)}
              className="w-full text-left px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <i className="fas fa-lightbulb w-3 h-3 inline mr-2" />
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Smart Features */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center flex justify-between">
          <span>
            <i className="fas fa-cog w-4 h-4 mr-2" />
            Smart Features
          </span>
          <span onClick={() => handleCollapsed('smartFeatures')} className="border border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-full px-2 py-1 cursor-pointer">
            { smartFeaturesCollapsed ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" /> }
          </span>
        </h3>
        <div className="space-y-2" id='smartFeatures'>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
            <span className="text-xs text-gray-600">Auto-suggestions</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
            <span className="text-xs text-gray-600">Grammar correction</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-600 mr-2" />
            <span className="text-xs text-gray-600">Style optimization</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AIConfigurationPanel;