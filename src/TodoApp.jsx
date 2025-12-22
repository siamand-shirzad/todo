import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { Badge } from '@/components/ui/badge';
import { Search, X, Zap, CalendarDays, Filter, XCircle, XCircleIcon } from 'lucide-react';
import DarkModeButton from './components/DarkModeButton';
import { CreateTaskDialog } from './components/CreateTaskDialog';
import useTodoStore from './store/useTodoStore';
import DeleteTaskDialog from './components/DeleteTaskDialog';
import { TaskItem } from './components/TaskItems';

const PRIORITIES = {
  ALL: 'all',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export default function ProTodoApp() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchChar, setSearchChar] = useState('');
  
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { todos, deleteTask, toggleTask, clearCompleted } = useTodoStore();

  const uniqueCategories = useMemo(() => {
    const cats = todos.map(t => t.category).filter(Boolean);
    return ['all', ...new Set(cats)];
  }, [todos]);

  // منطق فیلتر ترکیبی
  const filteredTodos = todos.filter(todo => {
    // 1. Tab Filter
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && !todo.completed) ||
      (activeTab === 'completed' && todo.completed);

    // 2. Search Filter
    const matchesSearch = todo.title.toLowerCase().includes(searchChar.toLowerCase());

    // 3. Priority Filter
    const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;

    // 4. Category Filter
    const matchesCategory = categoryFilter === 'all' || todo.category === categoryFilter;

    return matchesTab && matchesSearch && matchesPriority && matchesCategory;
  });

  // تابعی برای ریست کردن همه فیلترها
  const resetFilters = () => {
    setSearchChar('');
    setPriorityFilter('all');
    setCategoryFilter('all');
    setActiveTab('all');
  };

  const hasActiveFilters = searchChar || priorityFilter !== 'all' || categoryFilter !== 'all' || activeTab !== 'all';

  return (
    <div className="container mx-auto p-4 bg-background max-w-3xl min-h-screen flex flex-col justify-center">
      <Card className="shadow-2xl bg-card border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-3xl font-extrabold text-primary tracking-tight">
              <Zap className="h-7 w-7 mr-2 text-yellow-500 fill-yellow-500" />
              Task Manager
            </CardTitle>
            <DarkModeButton />
          </div>
          
          <CardDescription className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full w-fit">
              <CalendarDays size={14} />
              <span>{new Date().toLocaleDateString('fa-IR')}</span>
            </div>
            <span className="text-xs text-muted-foreground">
                {todos.filter(t => !t.completed).length} Tasks remain
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          
          {/* --- Section 1: Top Controls (Search & Add) --- */}
          <div className="flex gap-3">
            <div className="relative grow group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={searchChar}
                onChange={e => setSearchChar(e.target.value)}
                placeholder="Search tasks..."
                className="pl-9 bg-muted/30 border-muted-foreground/20 focus-visible:bg-background transition-all"
              />
              {searchChar && (
                <button
                  onClick={() => setSearchChar('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <CreateTaskDialog />
          </div>

          {/* --- Section 2: Filters Row (Minimal) --- */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="grid w-full sm:w-auto grid-cols-3 h-9 bg-muted/50">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs">Done</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Dropdown Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              
              {/* Priority Select */}
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="h-9 w-[110px] text-xs bg-transparent border-dashed border-muted-foreground/40 hover:border-primary/50 hover:bg-accent/50 transition-all">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High </SelectItem>
                  <SelectItem value="medium">Medium </SelectItem>
                  <SelectItem value="low">Low </SelectItem>
                </SelectContent>
              </Select>

              {/* Category Select */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-9 w-[110px] text-xs bg-transparent border-dashed border-muted-foreground/40 hover:border-primary/50 hover:bg-accent/50 transition-all">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                   {uniqueCategories.map(cat => (
                     <SelectItem key={cat} value={cat}>
                       {cat === 'all' ? 'All Categories' : cat}
                     </SelectItem>
                   ))}
                </SelectContent>
              </Select>

              {/* Reset Filter Button (Only shows if filters are active) */}
              {hasActiveFilters && (
                <Button 
                    variant="ghost" 
                    size="icon-lg" 
                    onClick={resetFilters} 
                    className=" text-muted-foreground hover:text-destructive "
                    title="Reset Filters"
                >
                    <XCircleIcon  className="" />
                </Button>
              )}
            </div>
          </div>

          {/* --- Section 3: Task List --- */}
          <div className="space-y-3 min-h-[200px]">
            {filteredTodos.length > 0 ? (
              filteredTodos.map(todo => (
                <TaskItem 
                    key={todo.id} 
                    todo={todo} 
                    toggleTask={toggleTask} 
                    deleteTask={deleteTask} 
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-3">
                <Filter className="h-10 w-10 opacity-20" />
                <p>No tasks found with these filters.</p>
                {hasActiveFilters && (
                    <Button variant="link" onClick={resetFilters} className="text-primary text-xs">
                        Clear filters
                    </Button>
                )}
              </div>
            )}
          </div>

          {/* --- Section 4: Footer --- */}
          {todos.some(t => t.completed) && (
            <div className="flex justify-end pt-2 border-t border-border/40">
              <DeleteTaskDialog title="Clear all completed tasks?" onConfirm={clearCompleted}>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                   Clear Completed Tasks
                </Button>
              </DeleteTaskDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}