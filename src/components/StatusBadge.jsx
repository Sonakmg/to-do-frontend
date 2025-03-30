import React from 'react';

const StatusBadge = ({ status = 'todo' }) => {
  const statusMap = {
    'todo': { label: 'TODO', className: 'status-badge-todo' },
    'in-progress': { label: 'IN PROGRESS', className: 'status-badge-in-progress' },
    'completed': { label: 'COMPLETED', className: 'status-badge-completed' }
  };

  const statusInfo = statusMap[status] || statusMap['todo'];

  return (
    <span className={`status-badge ${statusInfo.className}`}>
      {statusInfo.label}
    </span>
  );
};

export default StatusBadge;