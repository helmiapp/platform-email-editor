import { cn } from '@/editor/utils/classname';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  type?: 'solid' | 'dashed';
  className?: string;
};

export function Divider({
  orientation = 'vertical',
  type = 'solid',
  className,
}: DividerProps) {
  return (
    <div
      className={cn(
        'mly-bg-gray-200',
        orientation === 'horizontal' && 'mly-h-[1px] mly-w-full',
        orientation === 'vertical' && 'mly-min-h-[1px] mly-w-[1px] mly-grow',
        type === 'dashed' && 'mly-border-dashed',
        className
      )}
      role="separator"
    />
  );
}
