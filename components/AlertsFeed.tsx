
import React from 'react';
import { Alert } from '../types';
import { NotificationBellIcon } from './icons/NotificationBellIcon';

interface AlertsFeedProps {
  alerts: Alert[];
}

const severityClasses = {
  high: 'border-red-500 bg-red-500/10',
  medium: 'border-yellow-500 bg-yellow-500/10',
  low: 'border-blue-500 bg-blue-500/10',
};

const AlertsFeed: React.FC<AlertsFeedProps> = ({ alerts }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <NotificationBellIcon className="h-6 w-6 mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Alerts Feed</h3>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">No alerts at this time.</p>
        ) : (
            alerts.map(alert => (
            <div key={alert.id} className={`p-3 rounded-md border-l-4 ${severityClasses[alert.severity]}`}>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                {alert.zoneName} - {alert.severity === 'high' ? 'High-Risk Alert' : 'Warning'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                <p className="text-right text-xs text-gray-400 dark:text-gray-500 mt-2">
                {alert.timestamp.toLocaleTimeString()}
                </p>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default AlertsFeed;
