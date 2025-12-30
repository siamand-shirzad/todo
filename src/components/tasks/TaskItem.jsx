import React from 'react';
import useTodoStore from '@/store/useTodoStore';
import { SwipeableRow } from './SwipeableRow';
import { TaskCard } from './TaskCard';

export function TaskItem({ todo }) {
  const { toggleTask, deleteTask, openEditModal } = useTodoStore();

  const handleEdit = () => openEditModal(todo);
  const handleDelete = () => deleteTask(todo.id);
  const handleToggle = () => toggleTask(todo.id);

  return (
    <SwipeableRow 
      onSwipeLeft={handleDelete} 
      onSwipeRight={handleEdit}
    >
      <TaskCard 
        todo={todo}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </SwipeableRow>
  );
}