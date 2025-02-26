import { cn } from '@/editor/utils/classname';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  type?: 'solid' | 'dashed';
  className?: string;
};

export function Divider({
  orientation = 'horizontal',
  type = 'solid',
  className,
}: DividerProps) {
  return (
    <div
      className={cn(
        'mly-bg-gray-200',
        orientation === 'horizontal' && 'mly-h-[1px] mly-w-full',
        orientation === 'vertical' &&
          'mly-grow-1 mly-h-full mly-min-h-[1px] mly-w-[1px]',
        type === 'dashed' && 'mly-border-dashed',
        className
      )}
      role="separator"
    />
  );
}
