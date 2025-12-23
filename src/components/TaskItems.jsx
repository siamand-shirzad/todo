import * as React from 'react';
import { Pencil, Trash2, ChevronDown, Calendar as CalendarIcon, Clock, Tag, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import DeleteTaskDialog from './DeleteTaskDialog';
import useTodoStore from '@/store/useTodoStore';

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

export function TaskItem({ todo, toggleTask, deleteTask }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openEditModal = useTodoStore(state => state.openEditModal);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fa-IR-u-nu-latn', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        'group w-full border rounded-xl bg-card transition-all duration-300 ease-in-out',
        isOpen 
          ? 'border-primary/40 shadow-lg -translate-y-2 bg-accent/5' 
          : 'border-border/40 hover:border-border/80 hover:shadow-sm',
        todo.completed && 'opacity-80'
      )}>
      
      {/* --- Header Section --- */}
      <div className="flex items-center p-4 gap-4 group">
        <div
          className={cn(
            'w-1 rounded-full shrink-0 bg-linear-to-b transition-all duration-500',
            priorityStyles[todo.priority],
            todo.completed ? 'h-6 opacity-20' : 'h-8 opacity-60 group-hover:opacity-100'
          )}
        />
        
        <Checkbox 
          checked={todo.completed} 
          onCheckedChange={() => toggleTask(todo.id)} 
          className="h-4.5 w-4.5 transition-transform active:scale-90" 
        />

        <div 
          className="flex-1 cursor-pointer select-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={cn(
              'text-[16px] font-medium transition-all duration-300 block',
              todo.completed 
                ? 'text-muted-foreground line-through decoration-muted-foreground/50' 
                : 'text-foreground'
            )}>
            {todo.title}
          </span>
        </div>

        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-colors"
          >
            <ChevronDown
              className={cn(
                'h-4 w-4 text-muted-foreground transition-transform duration-300 ease-out',
                isOpen && 'rotate-180'
              )}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* --- Content Section --- */}
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        <div className="px-6 pb-5 pt-0 space-y-5 transition-opacity duration-500 data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
          
          {/* Description */}
          {todo.description && (
            <p className="text-[14px] text-muted-foreground/90 leading-relaxed border-l-2 border-primary/20 pl-3 ">
              {todo.description}
            </p>
          )}

          {/* Tags & Metadata */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">
            <div className="flex items-center gap-1.5">
              <Circle className={cn('h-2 w-2 fill-current', priorityDots[todo.priority])} />
              <span className="font-semibold">{todo.priority}</span>
            </div>

            <div className="flex items-center gap-1.5 before:content-['•'] before:ml-4 before:text-border">
              <Tag className="w-3 h-3" />
              {todo.category}
            </div>

            {todo.dueDate && (
              <div className="flex items-center gap-1.5 before:content-['•'] before:ml-4 before:text-border">
                <CalendarIcon className="w-3 h-3" />
                {formatDate(todo.dueDate)}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/40">
            <div className="text-[9px] md:text-[11px] text-muted-foreground/50 mr-auto flex items-center gap-1">
              <Clock className="w-3 h-3" /> 
              createdAt: {formatDate(todo.createdAt)}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openEditModal(todo)}
              className="h-8 text-xs gap-1.5 hover:text-primary hover:bg-primary/5 transition-colors">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Button>

            <DeleteTaskDialog onConfirm={() => deleteTask(todo.id)}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </DeleteTaskDialog>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}