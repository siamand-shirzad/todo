import React from 'react';
import useTodoStore from '@/store/useTodoStore';
import { SwipeableRow } from './SwipeableRow';
import { TaskCard } from './TaskCard';
import DeleteTaskDialog from '../DeleteTaskDialog';
import { useState } from 'react';

export function TaskItem({ todo }) {
  const { toggleTask, deleteTask, openEditModal } = useTodoStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = () => openEditModal(todo);

  const promptDelete = () => {
    setIsDeleteDialogOpen(true);
  }
  const handleDelete = () => {
    deleteTask(todo.id);
    setIsDeleteDialogOpen(true);
  };
  const handleToggle = () => toggleTask(todo.id);

  return (
    <>
      <SwipeableRow onSwipeLeft={promptDelete} onSwipeRight={handleEdit}>
        <TaskCard todo={todo} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
      </SwipeableRow>
      <DeleteTaskDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={handleDelete} />
    </>
  );
}
