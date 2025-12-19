import React, { useState } from 'react';
// Assuming shadcn/ui components are correctly imported
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
  X
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
          <CardDescription className="text-muted-foreground">
            Sample React/Tailwind portfolio project with data persistence (Zustand Persist)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 1. Add New Task Section */}
          <div className="flex space-x-2 mb-6">
            <Input
              placeholder="New task title..."
              className="grow"
              // ...
            />
            <CreateTaskDialog />
          </div>
          {/* 2. Filter & Search Section (بدون تغییر مهم) */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto ">
              {/* TabsList و TabsTrigger نیازی به تغییر دستی رنگ ندارند */}
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Done</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {/* 3. Task List */}
          <div className="space-y-3">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className="flex justify-center items-center  p-3 border rounded-lg border-border bg-transparent hover:bg-accent/50 transition duration-150">
                {/*  Main Content */}
                <div className="flex  space-x-3 grow">
                  <Checkbox onClick={() => toggleTask(todo.id)} checked={todo.completed} className="my-auto shrink-0" />
                  <div className="flex ">
                    <span
                      className={`text-lg font-normal ${
                        todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}>
                      {todo.title}
                    </span>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                      <Badge variant="outline" className="px-2 py-0.5 text-muted-foreground">
                        {todo.category}
                      </Badge>
                      <Badge priority={todo.priority}>
                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                      </Badge>
                      {/*  Created At */}
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 ml-1 mr-1" />
                        {formatDate(todo.createdAt)}
                      </span>
                      {/*  Due Date  */}
                      {todo.dueDate && (
                        <span className="flex items-center text-primary font-semibold">
                          <Calendar className="h-3 w-3 ml-2 mr-1" />
                          Due: {formatDate(new Date(todo.dueDate).getTime())}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/*  Actions (Edit & Delete) */}
                <div className="flex space-x-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className=" text-muted-foreground hover:text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/10 "
                    aria-label="Edit Task">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <DeleteTaskDialog onConfirm={() => deleteTask(todo.id)}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10 "
                      aria-label="Delete Task">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DeleteTaskDialog>
                  <div className="flex space-x-2 shrink-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className=" text-muted-foreground hover:text-primary hover:bg-popover"
                          aria-label="More actions">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-muted-foreground hover:text-foreground cursor-pointer">
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit Task
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-destructive cursor-pointer">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
