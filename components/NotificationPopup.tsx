
import React, { useEffect, useState } from 'react';
import { Alert } from '../types';
import { NotificationBellIcon } from './icons/NotificationBellIcon';

interface NotificationPopupProps {
  alert: Alert;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ alert, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Wait for fade-out transition
  };

  const severityClasses = {
    high: 'border-red-500 bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400 dark:border-red-800',
    medium: 'border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800',
    low: 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800',
  };

  return (
    <div
      className={`fixed bottom-5 right-5 w-full max-w-sm p-4 rounded-lg shadow-2xl border-l-4 transition-all duration-300 ease-in-out transform ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${severityClasses[alert.severity]}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <NotificationBellIcon className="h-6 w-6" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold">
            {alert.severity === 'high' ? 'High-Risk Alert!' : 'Water Quality Warning'}
          </p>
          <p className="mt-1 text-sm">{alert.message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={handleClose}
            className="inline-flex rounded-md bg-transparent text-current hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
