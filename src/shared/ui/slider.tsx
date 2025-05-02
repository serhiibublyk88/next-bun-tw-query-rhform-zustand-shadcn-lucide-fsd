'use client';

import { cn } from '@/shared/lib';
import * as SliderPrimitive from '@radix-ui/react-slider';

export function Slider({ className, ...props }: SliderPrimitive.SliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track
        className="relative h-1 w-full grow overflow-hidden rounded-full
       bg-zinc-200 dark:bg-zinc-700"
      >
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-4 w-4 rounded-full border border-primary
       bg-white shadow hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </SliderPrimitive.Root>
  );
}
