import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { AllowedLogoAlignment } from '../nodes/logo/logo';
import { BaseButton } from './base-button';
import { BubbleMenuButton } from './bubble-menu-button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type AlignmentSwitchProps = {
  alignment: AllowedLogoAlignment;
  onAlignmentChange: (alignment: AllowedLogoAlignment) => void;
};

export function AlignmentSwitch(props: AlignmentSwitchProps) {
  const { alignment = 'left', onAlignmentChange } = props;

  const alignments = {
    left: {
      icon: AlignLeft,
      tooltip: 'Align Left',
      onClick: () => {
        onAlignmentChange('left');
      },
    },
    center: {
      icon: AlignCenter,
      tooltip: 'Align Center',
      onClick: () => {
        onAlignmentChange('center');
      },
    },
    right: {
      icon: AlignRight,
      tooltip: 'Align Right',
      onClick: () => {
        onAlignmentChange('right');
      },
    },
  };

  const activeAlignment = alignments[alignment];

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <BaseButton variant="ghost" size="sm">
              <activeAlignment.icon className="mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5]" />
            </BaseButton>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>Alignment</TooltipContent>
      </Tooltip>
      <PopoverContent
        className="mly-flex mly-w-max mly-gap-0.5 mly-rounded-lg mly-p-0.5"
        side="top"
        sideOffset={8}
        align="center"
      >
        {Object.entries(alignments).map(([key, value]) => (
          <BubbleMenuButton
            key={key}
            icon={value.icon}
            tooltip={value.tooltip}
            command={value.onClick}
            isActive={() => key === alignment}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
