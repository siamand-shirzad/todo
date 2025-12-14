import * as React from "react";
import { Plus, Clock, List, Calendar, ChevronDown, Check } from "lucide-react";

// فرض بر این است که این کامپوننت‌ها از shadcn/ui وارد شده‌اند:
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// کامپوننت‌های انتخابی shadcn/ui
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

// --- تعریف آرایه‌ها و لیست‌ها ---

const priorities = [
  { value: "low", label: "Low", icon: Clock, color: "text-green-500" },
  { value: "medium", label: "Medium", icon: Clock, color: "text-yellow-500" },
  { value: "high", label: "High", icon: Clock, color: "text-red-500" },
];

const categories = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "learning", label: "Learning" },
  { value: "other", label: "Other" },
];

export function CreateTaskDialog({ onAddTask }) {
  const [open, setOpen] = React.useState(false);
  // حالت‌های محلی برای نگهداری مقادیر فرم
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState(priorities[0]); // Low as default
  const [category, setCategory] = React.useState(categories[0]); // Work as default
  const [dueDate, setDueDate] = React.useState(null); // Calendar state needed here

  // تابع هندل کردن ارسال فرم
  const handleSave = () => {
    if (!title.trim()) return; // Title is required

    const newTask = {
      id: Date.now(), // یا از یک کتابخانه UUID استفاده شود
      title,
      description,
      priority: priority.value,
      category: category.value,
      dueDate: dueDate ? dueDate.toISOString() : null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask); // فراخوانی تابع افزودن از کامپوننت والد (Task Manager)
    
    // ریست کردن فرم
    setTitle("");
    setDescription("");
    setDueDate(null);
    setOpen(false); // بستن دیالوگ
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 1. دکمه‌ای که دیالوگ را باز می‌کند (همان دکمه Task Manager) */}
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </DialogTrigger>

      {/* 2. محتوای دیالوگ */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl text-primary">
            <List className="h-5 w-5 mr-2" />
            Create New Task
          </DialogTitle>
          <DialogDescription>
            Enter the details for your new task. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          
          {/* Title Field */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Finish React portfolio project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Description Field */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add details about the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 min-h-[80px]"
            />
          </div>

          {/* Priority, Category, and Due Date Row */}
          <div className="grid grid-cols-3 gap-4">
            
            {/* Priority Selection (Combobox/Popover) */}
            <div className="grid gap-2 col-span-1">
              <Label>Priority</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between h-9"
                  >
                    <div className="flex items-center">
                        <priority.icon className={`mr-2 h-4 w-4 ${priority.color}`} />
                        {priority.label}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] p-0">
                  <Command>
                    <CommandGroup>
                      {priorities.map((p) => (
                        <CommandItem
                          key={p.value}
                          onSelect={() => {
                            setPriority(p);
                            // بستن Popover اگر نیازی به CommandInput نبود
                          }}
                        >
                          <p.icon className={`mr-2 h-4 w-4 ${p.color}`} />
                          {p.label}
                          <Check
                            className={`ml-auto h-4 w-4 ${
                              priority.value === p.value ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Category Selection (Combobox/Popover) */}
             <div className="grid gap-2 col-span-1">
              <Label>Category</Label>
              {/* ... مشابه Priority از Popover/Command استفاده کنید ... */}
               {/* فعلا برای سادگی فقط دکمه را می‌گذاریم */}
              <Button variant="outline" className="justify-between h-9 text-muted-foreground">
                  {category.label}
              </Button>
            </div>

            {/* Due Date (Calendar/Popover) - نیاز به کامپوننت Calendar از shadcn */}
            <div className="grid gap-2 col-span-1">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="justify-start text-left font-normal h-9"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                {/* * اینجا باید کامپوننت Calendar از shadcn/ui قرار گیرد 
                  * که اجازه انتخاب تاریخ و تنظیم setDueDate را می‌دهد
                */}
                <PopoverContent className="w-auto p-0">
                    {/* <CalendarComponent mode="single" selected={dueDate} onSelect={setDueDate} /> */}
                    <div className="p-2 text-center text-sm text-muted-foreground">Calendar component needed</div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <DialogFooter>
          {/* دکمه Save */}
          <Button type="submit" onClick={handleSave} disabled={!title.trim()}>
            Save Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}