import { Link2, Settings } from 'lucide-react';
import { BubbleMenuButton } from '../bubble-menu-button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { EditorBubbleMenuProps } from '../text-menu/text-bubble-menu';
import { Divider } from '../ui/divider';
import { TooltipProvider } from '../ui/tooltip';
import { SOCIAL_ICONS } from './use-social-state';

type SocialBubbleMenuContentProps = {
  editor: EditorBubbleMenuProps['editor'];
};

export function SocialBubbleMenuContent(props: SocialBubbleMenuContentProps) {
  const { editor } = props;
  if (!editor) return null;

  return (
    <TooltipProvider>
      <div className="mly-flex mly-items-stretch">
        <Popover>
          <PopoverTrigger asChild>
            <BubbleMenuButton icon={Settings} tooltip="Social Media Settings" />
          </PopoverTrigger>
          <PopoverContent className="mly-w-72">
            <div className="mly-space-y-4">
              <div className="mly-space-y-2">
                {Object.entries(SOCIAL_ICONS).map(([platform]) => (
                  <div
                    key={platform}
                    className="mly-flex mly-items-center mly-gap-2"
                  >
                    <input
                      type="checkbox"
                      id={platform}
                      className="mly-h-4 mly-w-4"
                      checked={true} // TODO: Implement state management
                      onChange={() => {}} // TODO: Implement toggle logic
                    />
                    <label htmlFor={platform} className="mly-capitalize">
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Divider />

        <BubbleMenuButton
          icon={Link2}
          tooltip="Edit Links"
          command={() => {}}
        />
      </div>
    </TooltipProvider>
  );
}
