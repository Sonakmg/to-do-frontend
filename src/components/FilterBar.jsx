import React from 'react';
import useTodos from '../hooks/useTodos';

const FilterBar = () => {
  const { filters, setFilters } = useTodos();

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="status-filter">Status:</label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter">Priority:</label>
        <select
          id="priority-filter"
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Sort by:</label>
        <select
          id="sort-filter"
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created Date</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;