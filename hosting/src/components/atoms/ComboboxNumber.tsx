'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Command } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { CommandGroup, CommandItem, CommandList } from './command';

interface ComboboxDemoProps {
  label: string;
  value: string;
}
export function ComboboxNumber({
  props,
  defaultSelected,
  onSelect,
}: {
  props: ComboboxDemoProps[];
  defaultSelected?: string;
  onSelect?: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultSelected);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[56px] justify-between h-[28px]'
        >
          {props.find((item) => item.value === value)?.label}

          <ChevronsUpDown className='ml-1 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[70px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {props.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onSelect?.(currentValue);
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
