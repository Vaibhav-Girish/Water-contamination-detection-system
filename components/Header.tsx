
import React from 'react';
import { UserRole } from '../types';
import { WaterDropIcon } from './icons/WaterDropIcon';
import { NotificationBellIcon } from './icons/NotificationBellIcon';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  alertCount: number;
}

const Header: React.FC<HeaderProps> = ({ userRole, onRoleChange, alertCount }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <WaterDropIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Water Contamination Detection
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <NotificationBellIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
              {alertCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {alertCount}
                </span>
              )}
            </div>
            <div className="flex items-center rounded-full bg-gray-100 dark:bg-gray-700 p-1">
              <button
                onClick={() => onRoleChange(UserRole.Citizen)}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                  userRole === UserRole.Citizen
                    ? 'bg-blue-500 text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Citizen
              </button>
              <button
                onClick={() => onRoleChange(UserRole.Authority)}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                  userRole === UserRole.Authority
                    ? 'bg-blue-500 text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Authority
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
