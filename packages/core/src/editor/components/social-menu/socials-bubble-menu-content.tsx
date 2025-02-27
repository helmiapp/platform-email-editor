import { Plus } from 'lucide-react';
import { useState } from 'react';
import { BubbleMenuButton } from '../bubble-menu-button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { EditorBubbleMenuProps } from '../text-menu/text-bubble-menu';

import { Input } from '../input';
import { TooltipProvider } from '../ui/tooltip';
import { DEFAULT_SOCIALS, useSocialState } from './use-social-state';

type SocialsBubbleMenuContentProps = {
  editor: EditorBubbleMenuProps['editor'];
};

export function SocialsBubbleMenuContent(props: SocialsBubbleMenuContentProps) {
  const { editor } = props;
  if (!editor) return null;

  const state = useSocialState(editor);
  if (!state) return null;

  const [customSocial, setCustomSocial] = useState({
    name: '',
    icon: '',
    url: '',
  });

  const handleAddSocial = (platformId: string) => {
    const platform = DEFAULT_SOCIALS[platformId];
    if (!platform) return;

    state.addSocial({
      ...platform,
      url: '',
    });
  };

  const handleAddCustomSocial = () => {
    if (!customSocial.name || !customSocial.icon || !customSocial.url) return;

    state.addSocial({
      id: crypto.randomUUID(),
      ...customSocial,
      isCustom: true,
    });

    setCustomSocial({ name: '', icon: '', url: '' });
  };

  return (
    <TooltipProvider>
      <div className="mly-flex mly-items-stretch mly-gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <BubbleMenuButton icon={Plus} tooltip="Add Social Media" />
          </PopoverTrigger>
          <PopoverContent className="mly-w-72">
            <div className="mly-space-y-4">
              <div className="mly-space-y-2">
                {Object.entries(DEFAULT_SOCIALS).map(([id, platform]) => (
                  <button
                    key={id}
                    onClick={() => handleAddSocial(id)}
                    className="mly-flex mly-w-full mly-items-center mly-gap-2 mly-rounded-md mly-px-2 mly-py-1.5 hover:mly-bg-gray-100"
                    disabled={state.activeSocials.some((s) => s.id === id)}
                  >
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="mly-h-5 mly-w-5"
                    />
                    <span className="mly-text-sm">{platform.name}</span>
                  </button>
                ))}
              </div>

              <div className="mly-space-y-2">
                <h3 className="mly-text-xs mly-font-medium mly-text-gray-500">
                  Custom Social Media
                </h3>
                <div className="mly-space-y-2">
                  <Input
                    placeholder="Name"
                    value={customSocial.name}
                    onChange={(e) =>
                      setCustomSocial((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Icon URL"
                    value={customSocial.icon}
                    onChange={(e) =>
                      setCustomSocial((prev) => ({
                        ...prev,
                        icon: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Profile URL"
                    value={customSocial.url}
                    onChange={(e) =>
                      setCustomSocial((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={handleAddCustomSocial}
                    className="mly-w-full mly-rounded-md mly-bg-gray-900 mly-px-3 mly-py-2 mly-text-sm mly-text-white hover:mly-bg-gray-800"
                    disabled={
                      !customSocial.name ||
                      !customSocial.icon ||
                      !customSocial.url
                    }
                  >
                    Add Custom Social
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </TooltipProvider>
  );
}
