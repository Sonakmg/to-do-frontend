const PriorityTag = ({ priority }) => {
    const priorityMap = {
      'low': { label: 'Low', color: 'bg-green-100 text-green-800' },
      'medium': { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
      'high': { label: 'High', color: 'bg-orange-100 text-orange-800' },
      'critical': { label: 'Critical', color: 'bg-red-100 text-red-800' }
    };
  
    return (
      <span className={`priority-tag ${priorityMap[priority].color} px-2 py-1 rounded-full text-xs font-semibold`}>
        {priorityMap[priority].label}
      </span>
    );
  };

export default PriorityTag;