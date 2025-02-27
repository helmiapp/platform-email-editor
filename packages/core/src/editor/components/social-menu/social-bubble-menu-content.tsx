import { Link2, Trash } from 'lucide-react';
import { BubbleMenuButton } from '../bubble-menu-button';
import { Input } from '../input';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { EditorBubbleMenuProps } from '../text-menu/text-bubble-menu';
import { TooltipProvider } from '../ui/tooltip';
import { useSocialState } from './use-social-state';

type SocialBubbleMenuContentProps = {
  editor: EditorBubbleMenuProps['editor'];
};

export function SocialBubbleMenuContent(props: SocialBubbleMenuContentProps) {
  const { editor } = props;
  if (!editor) return null;

  const state = useSocialState(editor);
  if (!state || !state.selectedSocialId) return null;

  const selectedSocial = state.activeSocials.find(
    (s) => s.id === state.selectedSocialId
  );
  if (!selectedSocial) return null;

  return (
    <TooltipProvider>
      <div className="mly-flex mly-items-stretch mly-gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <BubbleMenuButton icon={Link2} tooltip="Edit URL" />
          </PopoverTrigger>
          <PopoverContent className="mly-w-72">
            <div className="mly-space-y-4">
              <Input
                placeholder="Profile URL"
                value={selectedSocial.url}
                onChange={(e) =>
                  state.updateSocial(selectedSocial.id, {
                    url: e.target.value,
                  })
                }
              />
              {selectedSocial.isCustom && (
                <>
                  <Input
                    placeholder="Name"
                    value={selectedSocial.name}
                    onChange={(e) =>
                      state.updateSocial(selectedSocial.id, {
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Icon URL"
                    value={selectedSocial.icon}
                    onChange={(e) =>
                      state.updateSocial(selectedSocial.id, {
                        icon: e.target.value,
                      })
                    }
                  />
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <BubbleMenuButton
          icon={Trash}
          tooltip="Remove"
          command={() => state.removeSocial(selectedSocial.id)}
        />
      </div>
    </TooltipProvider>
  );
}
