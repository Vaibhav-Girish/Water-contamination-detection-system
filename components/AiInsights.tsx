
import React, { useState, useCallback } from 'react';
import { SensorReading, Zone } from '../types';
import { generateAiInsights } from '../services/geminiService';
import { AiBrainIcon } from './icons/AiBrainIcon';

interface AiInsightsProps {
  zone: Zone | null;
  history: SensorReading[];
}

const AiInsights: React.FC<AiInsightsProps> = ({ zone, history }) => {
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = useCallback(async () => {
    if (!zone) return;
    setIsLoading(true);
    setError(null);
    setInsights('');
    try {
      const result = await generateAiInsights(zone, history);
      setInsights(result);
    } catch (err) {
      setError('Failed to generate insights.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [zone, history]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <AiBrainIcon className="h-6 w-6 mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">AI Insights Panel</h3>
      </div>
      
      {!zone ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Select a zone on the map to get AI insights.</p>
      ) : (
        <>
          <button
            onClick={handleGenerateInsights}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : `Get Insights for ${zone.name}`}
          </button>
          
          <div className="mt-4 min-h-[150px]">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {insights && (
              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                {insights}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AiInsights;
