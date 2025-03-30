import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

const FilterBar = () => {
  const { filters, setFilters } = useContext(TodoContext);

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Status:</label>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Priority:</label>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By:</label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created Date</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;