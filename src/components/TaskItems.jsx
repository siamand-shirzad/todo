import * as React from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, ChevronDown, Calendar as CalendarIcon, Clock, Tag, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import DeleteTaskDialog from './DeleteTaskDialog';

const priorityStyles = {
  high: 'from-red-500 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.25)]',
  medium: 'from-yellow-400 to-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.2)]',
  low: 'from-emerald-400 to-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
};

const priorityDots = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-emerald-500'
};

export function TaskItem({ todo, toggleTask, deleteTask, onEdit }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        'group w-full border rounded-xl bg-card transition-all duration-300 hover:bg-accent/5',
        isOpen ? 'border-primary/20 shadow-md translate-y-[-1px]' : 'border-border/40 hover:border-border/80'
      )}>
      {/* --- Header Section --- */}
      <div className="flex items-center p-4 gap-4">
        <div
          className={cn(
            'w-1 h-8 rounded-full shrink-0 bg-linear-to-b transition-all duration-300 opacity-60 group-hover:opacity-100',
            priorityStyles[todo.priority],
            todo.completed && 'opacity-30'
          )}
        />
        <Checkbox checked={todo.completed} onCheckedChange={() => toggleTask(todo.id)} className="h-4 w-4" />
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <span
            className={cn(
              'text-[16px] font-medium transition-colors',
              todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'
            )}>
            {todo.title}
          </span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ChevronDown
              className={cn('h-4 w-4 text-muted-foreground transition-transform duration-300', isOpen && 'rotate-180')}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* --- Content Section --- */}
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
      
        <div className="px-6 pb-5 pt-0 space-y-5">
          {/* Description */}
          {todo.description && (
            <p className="text-[14px] text-muted-foreground/80 leading-relaxed border-l-2 border-border/40 pl-3">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center  gap-x-5 gap-y-2 px-1 text-[10px]  uppercase tracking-wid text-muted-foreground/80">
            {/* Priority */}
            <div className="flex items-center gap-1.5">
              <Circle className={cn('h-2 w-2 fill-current', priorityDots[todo.priority])} />
              {todo.priority}
            </div>

            {/* Category */}
            <div className="flex items-center gap-1.5 before:content-['•'] before:mr-4 before:text-border">
              <Tag className="w-3 h-3" />
              {todo.category}
            </div>

            {/* Due Date */}
            {todo.dueDate && (
              <div className="flex items-center gap-1.5 before:content-['•'] before:mr-4 before:text-border">
                <CalendarIcon className="w-3 h-3" />
                {format(new Date(todo.dueDate), 'MMM d, yyyy')}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
            <div className="text-[10px] text-muted-foreground mr-auto flex items-center gap-1">
              <Clock className="w-3 h-3" /> Created: {format(todo.createdAt, 'PP')}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(todo)}
              className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Button>
            <DeleteTaskDialog onConfirm={() => deleteTask(todo.id)}>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10 text-xs "
                aria-label="Delete Task">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </DeleteTaskDialog>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
