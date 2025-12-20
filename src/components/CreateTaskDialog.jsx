import * as React from 'react';
import { Plus, Calendar as CalendarIcon, List, ChevronDown, Check } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import useTodoStore from '@/store/useTodoStore';

const priorities = [
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' }
];
const categories = [
  { value: 'work', label: 'Work', color: 'bg-blue-500' },
  { value: 'personal', label: 'Personal', color: 'bg-purple-500' },
  { value: 'learning', label: 'Learning', color: 'bg-indigo-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' }
];

export function CreateTaskDialog() {
  const addTask = useTodoStore(state => state.addTask);
  const [open, setOpen] = React.useState(false);

  // فرم استیت‌ها (Form States)
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState(priorities[0]);
  const [category, setCategory] = React.useState(categories[0]);
  const [dueDate, setDueDate] = React.useState(null);

  const handleSave = e => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority: priority.value,
      category: category.value,
      dueDate: dueDate ? dueDate.toISOString() : null,
      completed: false,
      createdAt: Date.now()
    };

    addTask(newTask);

    // ریست کردن فرم بعد از ذخیره
    setTitle('');
    setDescription('');
    setPriority(priorities[0]);
    setCategory(categories[0]);
    setDueDate(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm font-semibold">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[500px] p-0 overflow-hidden  data-[state=open]:animate-scale-fade-in data-[state=closed]:animate-scale-fade-out ">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center text-xl gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <List className="h-5 w-5 text-primary" />
            </div>
            Create New Task
          </DialogTitle>
          <DialogDescription>Organize your day by adding a new task details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave}>
          <div className="p-6 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="What needs to be done?"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="h-10 shadow-sm"
                autoFocus
              />
            </div>

            {/* ردیف تنظیمات سه تایی */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Priority */}
              <div className="grid gap-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Priority</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between h-9 px-3 font-normal">
                      <div className="flex items-center gap-2">
                        <div className={cn('h-2 w-2 rounded-full', priority.color)} />
                        {priority.label}
                      </div>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[140px] p-1 " align="start">
                    {priorities.map(p => (
                      <button
                        key={p.value}
                        onClick={() => setPriority(p)}
                        className="flex items-center w-full gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-accent transition-colors">
                        <div className={cn('h-2 w-2 rounded-full', p.color)} />
                        {p.label}
                        {priority.value === p.value && <Check className="ml-auto h-3 w-3" />}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Category */}
              <div className="grid gap-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Category</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between h-9 px-3 font-normal">
                      <div className="flex items-center gap-2">
                        <div className={cn('h-2 w-2 rounded-full', category.color)} />
                        {category.label}
                      </div>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[140px] p-1" align="start">
                    {categories.map(c => (
                      <button
                        key={c.value}
                        onClick={() => setCategory(c)}
                        className="flex items-center w-full gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-accent transition-colors">
                        <div className={cn('h-2 w-2 rounded-full', c.color)} />
                        {c.label}
                        {category.value === c.value && <Check className="ml-auto h-3 w-3" />}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date Picker */}
              <div className="grid gap-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'justify-start text-left h-9 px-3 font-normal',
                        !dueDate && 'text-muted-foreground'
                      )}>
                      <CalendarIcon className="mr-2 h-3 w-3" />
                      {dueDate ? format(dueDate, 'MMM d') : <span>Pick date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Write some notes..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="min-h-20 resize-none shadow-sm"
              />
            </div>
          </div>

          <DialogFooter className="p-6 pt-0 ">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()} className="px-6">
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
