import React from 'react';
import { formatAnswer, extractKeyPoints, FormattedSegment } from '../utils/formatAnswer';

interface FormattedAnswerProps {
  answer: string;
  className?: string;
}

const FormattedAnswer: React.FC<FormattedAnswerProps> = ({ answer, className = '' }) => {
  const segments = formatAnswer(answer);
  const keyPoints = extractKeyPoints(answer);
  
  const renderSegment = (segment: FormattedSegment, index: number) => {
    switch (segment.type) {
      case 'definition':
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r-lg">
            <div className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">📖</span>
              <p className="text-gray-800 font-medium leading-relaxed">
                {segment.content}
              </p>
            </div>
          </div>
        );
      
      case 'list':
        return (
          <div key={index} className="flex items-start mb-3">
            <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">
              {segment.isNumbered ? '🔹' : '▸'}
            </span>
            <p className="text-gray-700 leading-relaxed">
              {segment.content}
            </p>
          </div>
        );
      
      case 'highlight':
        return (
          <div key={index} className="bg-yellow-50 border border-yellow-200 p-3 mb-4 rounded-lg">
            <div className="flex items-start">
              <span className="text-yellow-600 mr-3 mt-1">⭐</span>
              <p className="text-gray-800 font-medium leading-relaxed">
                {segment.content}
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-3">
            {segment.content}
          </p>
        );
    }
  };

  // If we have clear key points, display them separately
  if (keyPoints.length > 0 && segments.length > 2) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Main content */}
        <div className="space-y-3">
          {segments.filter(s => s.type !== 'list').map((segment, index) => 
            renderSegment(segment, index)
          )}
        </div>
        
        {/* Key points section */}
        {keyPoints.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">🎯</span>
              核心要点
            </h4>
            <div className="space-y-2">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default rendering for simpler content
  return (
    <div className={`space-y-4 ${className}`}>
      {segments.map((segment, index) => renderSegment(segment, index))}
    </div>
  );
};

export default FormattedAnswer; 