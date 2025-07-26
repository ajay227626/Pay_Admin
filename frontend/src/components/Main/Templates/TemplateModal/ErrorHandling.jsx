import React from 'react';
import { AlertTriangle, X, RefreshCw, ExternalLink, CheckCircle, Info } from 'lucide-react';

const ErrorHandling = ({
  errors,
  onClearErrors
}) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  const errorCategories = {
    validation: errors.filter(error => error.toLowerCase().includes('validation') || error.toLowerCase().includes('required')),
    formatting: errors.filter(error => error.toLowerCase().includes('format') || error.toLowerCase().includes('html')),
    content: errors.filter(error => error.toLowerCase().includes('content') || error.toLowerCase().includes('text')),
    general: errors.filter(error => 
      !error.toLowerCase().includes('validation') &&
      !error.toLowerCase().includes('required') &&
      !error.toLowerCase().includes('format') &&
      !error.toLowerCase().includes('html') &&
      !error.toLowerCase().includes('content') &&
      !error.toLowerCase().includes('text')
    )
  };

  const troubleshootingTips = [
    'Ensure all required fields are filled',
    'Check HTML formatting and syntax',
    'Verify email content structure',
    'Test template across different devices'
  ];

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
          <h3 className="text-sm font-semibold text-red-800">
            {errors.length} Error{errors.length > 1 ? 's' : ''} Found
          </h3>
        </div>
        <button
          onClick={onClearErrors}
          className="text-red-500 hover:text-red-700 p-1"
          title="Clear all errors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Error Categories */}
      <div className="space-y-3">
        {/* Validation Errors */}
        {errorCategories.validation.length > 0 && (
          <div className="bg-white rounded-lg p-3 border border-red-200">
            <h4 className="text-xs font-semibold text-red-700 mb-2">Validation Issues</h4>
            <ul className="space-y-1">
              {errorCategories.validation.map((error, index) => (
                <li key={index} className="text-xs text-red-600 flex items-start">
                  <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Formatting Errors */}
        {errorCategories.formatting.length > 0 && (
          <div className="bg-white rounded-lg p-3 border border-red-200">
            <h4 className="text-xs font-semibold text-red-700 mb-2">Formatting Issues</h4>
            <ul className="space-y-1">
              {errorCategories.formatting.map((error, index) => (
                <li key={index} className="text-xs text-red-600 flex items-start">
                  <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Errors */}
        {errorCategories.content.length > 0 && (
          <div className="bg-white rounded-lg p-3 border border-red-200">
            <h4 className="text-xs font-semibold text-red-700 mb-2">Content Issues</h4>
            <ul className="space-y-1">
              {errorCategories.content.map((error, index) => (
                <li key={index} className="text-xs text-red-600 flex items-start">
                  <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* General Errors */}
        {errorCategories.general.length > 0 && (
          <div className="bg-white rounded-lg p-3 border border-red-200">
            <h4 className="text-xs font-semibold text-red-700 mb-2">General Issues</h4>
            <ul className="space-y-1">
              {errorCategories.general.map((error, index) => (
                <li key={index} className="text-xs text-red-600 flex items-start">
                  <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Troubleshooting Tips */}
      <div className="mt-4 bg-white rounded-lg p-3 border border-red-200">
        <h4 className="text-xs font-semibold text-red-700 mb-2">Troubleshooting Tips</h4>
        <ul className="space-y-1">
          {troubleshootingTips.map((tip, index) => (
            <li key={index} className="text-xs text-red-600 flex items-start">
              <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
        <button className="mt-2 flex items-center text-xs text-red-700 hover:text-red-800">
          <ExternalLink className="w-3 h-3 mr-1" />
          Email Template Guide
        </button>
      </div>
    </div>
  );
};

export default ErrorHandling;