import * as React from 'react';
import { Command, CommandGroup, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from './Button';

interface ComboboxProps {
  items: ComboboxDemoProps[];
  defaultSelected?: string;
  onSelect?: (value: string) => void;
}

interface ComboboxDemoProps {
  label: string;
  value: string;
}

const ComboboxNumber: React.FC<ComboboxProps> = ({
  items,
  defaultSelected,
  onSelect,
}) => {
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
          {items.find((item) => item.value === value)?.label}
          <ChevronsUpDown className='ml-1 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[70px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    onSelect?.(currentValue);
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

ComboboxNumber.displayName = 'ComboboxNumber';

export { ComboboxNumber };
