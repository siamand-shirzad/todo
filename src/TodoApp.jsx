import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Loader2,
  Zap,
  Pencil,
  MoreHorizontal,
  MoreHorizontalIcon,
  X,
  ChevronRight,
  CalendarDays,
  ListFilterIcon
} from 'lucide-react';
import DarkmodeButton from './components/DarkmodeButton';
import { CreateTaskDialog } from './components/CreateTaskDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './components/ui/dropdown-menu';
import useTodoStore from './store/useTodoStore';
import DeleteTaskDialog from './components/DeleteTaskDialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { GoTrash } from 'react-icons/go';
import { FiTrash2 } from 'react-icons/fi';
import { TaskItem } from './components/TaskItems';
import { TaskItem1 } from './components/TaskItems1';
const staticTodos = [
  {
    id: 1702554000001,
    title: 'Build main shadcn components for portfolio',
    completed: false,
    category: 'Project',
    priority: 'high',
    createdAt: 1702554000001,
    dueDate: '2025-12-15' // Tomorrow
  },
  {
    id: 1702554000002,
    title: 'Buy essentials for the weekend',
    completed: true,
    category: 'Personal',
    priority: 'low',
    createdAt: 1702554000002,
    dueDate: null
  },
  {
    id: 1702554000003,
    title: 'Deep dive into React Query and Zustand Persist',
    completed: false,
    category: 'Learning',
    priority: 'medium',
    createdAt: 1702554000003,
    dueDate: '2025-12-14' // Today
  }
];

const formatDate = timestamp => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function ProTodoApp() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchChar, setSearchChar] = useState('');

  const todos = useTodoStore(state => state.todos);
  const deleteTask = useTodoStore(state => state.deleteTask);
  const toggleTask = useTodoStore(state => state.toggleTask);
  const updateTask = useTodoStore(state => state.updateTask);
  const clearCompleted = useTodoStore(state => state.clearCompleted);
  // Filters should be applied here
  // const filteredTodos = useMemo(() => { ... });

  // فرض می‌کنیم تمام کامپوننت‌ها و توابع کمکی (Helper Functions) وارد شده‌اند.
  // توجه: توابع کمکی getPriorityColor و formatDate باید همچنان در بالا وجود داشته باشند.

  // ----------------------------------------------------------------------------------
  // کامپوننت اصلی بازنویسی شده
  // ----------------------------------------------------------------------------------
  const filteredTodos = todos.filter(todo => {
    // فیلتر تب فعال
    const tabFilter =
      activeTab === 'all' ||
      (activeTab === 'active' && !todo.completed) ||
      (activeTab === 'completed' && todo.completed);

    // فیلتر جستجو
    console.log(searchChar);

    const searchFilter = todo.title.toLowerCase().includes(searchChar.toLowerCase());

    // فقط وقتی هر دو درست باشه، عنصر نگه داشته میشه
    return tabFilter && searchFilter;
  });

  return (
    <div className="container mx-auto p-4  bg-background max-w-3xl ">
      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl font-extrabold text-primary">
            <Zap className="h-6 w-6 mr-2" />
            Task Manager
            <DarkmodeButton className="ml-auto " />
          </CardTitle>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2 text-muted-foreground">
            <CardDescription className="text-sm">
              <span className="hidden md:block w-1 h-1 bg-muted-foreground/30 rounded-full"></span>
              <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full w-fit">
                <CalendarDays size={12} />
                <span>جمعه، ۲۹ آذر</span>
              </div>
            </CardDescription>
          </div>{' '}
        </CardHeader>
        <CardContent>
          {/* 1. Add New Task Section */}
          <div className="flex space-x-2 mb-6">
            <div className="relative grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchChar}
                onChange={e => setSearchChar(e.target.value)}
                placeholder="Search by title..."
                className="pl-10"
              />
              {searchChar && (
                <button
                  onClick={() => setSearchChar('')}
                  className="absolute right-2 top-1/2 transform  -translate-y-1/2">
                  <X className="text-muted-foreground hover:text-foreground w-5 h-5 transition-colors duration-150" />
                </button>
              )}
            </div>

            <CreateTaskDialog />
          </div>
          <div className="flex items-center justify-between mb-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid gap-2 grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Done</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex mr-2  ">
              <span className="text-sm text-muted-foreground">
                {activeTab === 'all' && `${filteredTodos.length} total tasks`}
                {activeTab === 'active' && `${filteredTodos.length} active tasks`}
                {activeTab === 'completed' && `${filteredTodos.length} completed tasks`}
              </span>
            </div>
          </div>
          {/* 2. Filter Section */}
          {/* <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-full border border-border/20 text-[11px] font-bold text-muted-foreground uppercase tracking-tight shrink-0">
              <ListFilterIcon className="w-3 h-3" />
              Filters:
            </div>

            نمونه یک فیلتر فعال
            <button className="px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-medium text-primary hover:bg-primary/10 transition-colors whitespace-nowrap">
              High Priority
            </button>

            نمونه یک فیلتر غیرفعال
            <button className="px-3 py-1.5 rounded-full bg-muted/30 border border-transparent text-xs font-medium text-muted-foreground hover:border-border/50 transition-colors whitespace-nowrap">
              Design
            </button>

            <button className="px-3 py-1.5 rounded-full bg-muted/30 border border-transparent text-xs font-medium text-muted-foreground hover:border-border/50 transition-colors whitespace-nowrap">
              Dev
            </button>
          </div> */}
          {/* 3. Task List */}
          <div className="space-y-3">
            {filteredTodos.map(todo => (
              <TaskItem key={todo.id} todo={todo} toggleTask={toggleTask} deleteTask={deleteTask} />
              // <Collapsible
              //   key={todo.id}
              //   className="w-full border rounded-lg border-border bg-transparent hover:bg-accent/30 transition-all duration-200 group">
              //   {/* ردیف اصلی که همیشه نمایش داده می‌شود */}
              //   <div className="flex items-center p-3 gap-3 select-none ">
              //     <Checkbox id={todo.id}
              //       onClick={e => {
              //         toggleTask(todo.id);
              //       }}
              //       checked={todo.completed}
              //       className="shrink-0"
              //     />

              //     <div className="grow min-w-0">
              //       <label htmlFor={todo.id}
              //         className={`text-base tracking-tight truncate block select-none ${
              //           todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              //         }`}>
              //         {todo.title}
              //       </label>
              //     </div>

              //     {/* بخش دکمه‌های عملیاتی */}
              //     <div className="flex items-center space-x-1 md:space-x-2  shrink-0">
              //       <Button
              //         variant="ghost"
              //         size="icon"
              //         className=" text-muted-foreground hover:text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/10 h-8 w-8"
              //         aria-label="Edit Task">
              //         <Pencil className="h-4 w-4" />
              //       </Button>
              //       <DeleteTaskDialog onConfirm={() => deleteTask(todo.id)}>
              //         <Button
              //           variant="ghost"
              //           size="icon"
              //           className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10 h-8 w-8 "
              //           aria-label="Delete Task">
              //           <Trash2 className="h-4 w-4" />
              //         </Button>
              //       </DeleteTaskDialog>

              //       <CollapsibleTrigger asChild>
              //         <Button variant="ghost" size="icon" className="h-8 w-8">
              //           <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
              //         </Button>
              //       </CollapsibleTrigger>
              //     </div>
              //   </div>

              //   <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              //     <div className="px-3 pb-4 pt-2 flex flex-wrap items-center gap-3 border-t border-border/40 mx-3 mt-1">
              //       <Badge variant="outline" className="px-2 py-0.5 text-muted-foreground">
              //         {todo.category}
              //       </Badge>
              //       <Badge priority={todo.priority}>
              //         {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              //       </Badge>
              //       <div className="flex items-center text-xs text-muted-foreground">
              //         <Clock className="h-3 w-3 mr-1" />
              //         {formatDate(todo.createdAt)}
              //       </div>
              //       {todo.dueDate && (
              //         <div className="flex items-center text-xs text-primary font-semibold">
              //           <Calendar className="h-3 w-3 mr-1" />
              //           Due: {formatDate(new Date(todo.dueDate).getTime())}
              //         </div>
              //       )}{' '}
              //       {todo.description && (
              //         <p className="mt-2 sm:mt-0 sm:ml-auto text-sm text-muted-foreground wrap-break-words">
              //           {todo.description}
              //         </p>
              //       )}
              //     </div>
              //   </CollapsibleContent>
              // </Collapsible>
            ))}
          </div>{' '}
          {/* 4. Footer Actions (Clear Completed) */}
          <div className="mt-6 flex justify-end">
            <DeleteTaskDialog title="Clear all completed tasks?" onConfirm={clearCompleted}>
              <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                Clear Completed
              </Button>
            </DeleteTaskDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
