import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '../input';

interface ImageSizeProps {
  dimension: 'width' | 'height';
  value: number | string;
  onValueChange: (value: number | string) => void;
}

export function ImageSize({ dimension, value, onValueChange }: ImageSizeProps) {
  const label = dimension === 'width' ? 'W' : 'H';
  const displayValue = value === '100%' ? 'MAX' : value;

  return (
    <div className="mly-flex mly-items-center mly-gap-1.5">
      <Label className="mly-text-xs mly-font-medium mly-text-midnight-gray">
        {label}
      </Label>
      <Input
        type="text"
        value={displayValue}
        onChange={(e) => {
          const val = e.target.value;
          if (val === 'MAX') {
            onValueChange('100%');
          } else {
            const num = parseInt(val);
            if (!isNaN(num)) {
              onValueChange(num);
            }
          }
        }}
        className="mly-h-7 mly-w-[60px] mly-text-xs"
      />
    </div>
  );
}
