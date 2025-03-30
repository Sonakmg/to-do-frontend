import React from 'react';
import clsx from 'clsx';
const StatusBadge = ({ status }) => {
    const statusMap = {
      'todo': { label: 'TODO', color: 'bg-gray-100 text-gray-800' },
      'in-progress': { label: 'IN PROGRESS', color: 'bg-blue-100 text-blue-800' },
      'completed': { label: 'COMPLETED', color: 'bg-green-100 text-green-800' }
    };
  
    return (
      <span className={`status-badge ${statusMap[status].color} px-2 py-1 rounded-full text-xs font-semibold`}>
        {statusMap[status].label}
      </span>
    );
  };
export default StatusBadge;