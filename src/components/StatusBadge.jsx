import React from 'react';
import clsx from 'clsx';

const StatusBadge = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', className: 'completed' };
      case 'in-progress':
        return { label: 'In Progress', className: 'in-progress' };
      default:
        return { label: 'To Do', className: 'todo' };
    }
  };

  const { label, className } = getStatusInfo();

  return (
    <span className={clsx('status-badge', className)}>
      {label}
    </span>
  );
};

export default StatusBadge;