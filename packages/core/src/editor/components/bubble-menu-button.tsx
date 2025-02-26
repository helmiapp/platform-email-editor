import { BaseButton } from '@/editor/components/base-button';
import { cn } from '@/editor/utils/classname';
import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export interface BubbleMenuItem {
  name?: string;
  icon?: LucideIcon;
  isActive?: () => boolean;
  command?: () => void;
  disbabled?: boolean;
  tooltip?: string;
  className?: string;
  iconClassName?: string;
  nameClassName?: string;
  children?: React.ReactNode;
}

export function BubbleMenuButton(item: BubbleMenuItem) {
  const { tooltip, children } = item;

  const content = (
    <BaseButton
      variant="ghost"
      size="sm"
      {...(item.command ? { onClick: item.command } : {})}
      data-state={item?.isActive?.()}
      className={cn(
        'mly-flex mly-items-center mly-gap-1 mly-px-2.5 disabled:mly-cursor-not-allowed disabled:mly-opacity-50',
        item?.className
      )}
      type="button"
      disabled={item.disbabled}
    >
      {item.icon && (
        <item.icon
          className={cn(
            'mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5]',
            item?.iconClassName
          )}
        />
      )}
      {!item.icon && item.name && (
        <span
          className={cn(
            'mly-text-sm mly-font-medium mly-text-slate-600',
            item?.nameClassName
          )}
        >
          {item.name}
        </span>
      )}
      {children}
    </BaseButton>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent sideOffset={8}>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
