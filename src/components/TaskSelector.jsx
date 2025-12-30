import { Label } from '@radix-ui/react-dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const TaskSelector = ({label,value,options,onChange,}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="grid gap-1.5">
      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-between h-9 px-3 font-normal">
            <div className="flex items-center gap-2">
              <div className={cn('h-2 w-2 rounded-full', value.color)} />
              {value.label}
            </div>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent  className="w-[140px] p-1 bg-card border mt-1 rounded-lg " align="start">
          {options.map(p => (
            <button
              key={p.value}
              onClick={() => {
                onChange(p)
                setOpen(false)
              }}
              className="flex items-center w-full gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-accent transition-colors">
              <div className={cn('h-2 w-2 rounded-full', p.color)} />
              {p.label}
              {value.value === p.value && <Check className="ml-auto h-3 w-3" />}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskSelector;
