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
  MoreHorizontalIcon
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

const getPriorityColor = priority => {
  switch (priority) {
    case 'high':
      return 'bg-red-500 hover:bg-red-600';
    case 'medium':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'low':
      return 'bg-green-500 hover:bg-green-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

// ----------------------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------------------

export default function ProTodoApp() {
  const [activeTab, setActiveTab] = useState('all');
  // In a real project, these would come from the Zustand Store
  // const todos = staticTodos;
  const todos = useTodoStore(state => state.todos);
  // Filters should be applied here
  // const filteredTodos = useMemo(() => { ... });

  // فرض می‌کنیم تمام کامپوننت‌ها و توابع کمکی (Helper Functions) وارد شده‌اند.
  // توجه: توابع کمکی getPriorityColor و formatDate باید همچنان در بالا وجود داشته باشند.

  // ----------------------------------------------------------------------------------
  // کامپوننت اصلی بازنویسی شده
  // ----------------------------------------------------------------------------------

  return (
    <div className="container mx-auto p-4  bg-background max-w-3xl ">
      {/* * تغییرات: از shadow-2xl به shadow-lg و bg-card برای تم‌دهی استفاده شد */}
      <Card className="shadow-lg bg-card">
        <CardHeader>
          {/* * تغییرات: text-blue-600 به text-primary تبدیل شد */}
          <CardTitle className="flex items-center text-3xl font-extrabold text-primary">
            <Zap className="h-6 w-6 mr-2" />
            Pro Task Manager
          </CardTitle>
          {/* * تغییرات: CardDescription از text-muted-foreground استفاده می‌کند */}
          <CardDescription className="text-muted-foreground">
            Sample React/Tailwind portfolio project with data persistence (Zustand Persist)
          </CardDescription>
          <DarkmodeButton />
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
              {/* * تغییرات: text-gray-400 به text-muted-foreground تبدیل شد */}
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by title..." className="pl-8" />
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
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex justify-center-safe  p-3 border rounded-lg border-border bg-transparent hover:bg-accent/50 transition duration-150">
                {/* 3.1. Main Content */}
                <div className="flex  space-x-3 grow">
                  <Checkbox checked={todo.completed} className="mt-1 shrink-0" />
                  <div className="flex flex-col">
                    <span
                      className={`text-lg font-medium ${
                        todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}>
                      {todo.title}
                    </span>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                      <Badge variant="outline" className="px-2 py-0.5 text-muted-foreground">
                        {todo.category}
                      </Badge>
                      {/* 3.1.2. Priority (تابع کمکی رنگ را می‌گیرد) */}
                      <Badge className={`px-2 py-0.5 text-white ${getPriorityColor(todo.priority)}`}>
                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                      </Badge>
                      {/* 3.1.3. Created At */}
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 ml-1 mr-1" />
                        {formatDate(todo.createdAt)}
                      </span>
                      {/* 3.1.4. Due Date (به جای رنگ ثابت blue-500 از primary استفاده می‌کنیم) */}
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
                  {/* Edit Button: از text-muted-foreground استفاده می‌کند */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className=" text-muted-foreground hover:text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/10 "
                    aria-label="Edit Task" // A11y Improvement
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {/* Delete Button: از رنگ‌های معناگرای destructive استفاده می‌کند */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10 "
                    aria-label="Delete Task" // A11y Improvement
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
            <Button variant="outline" className="text-destructive hover:bg-destructive/10">
              Clear Completed
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
