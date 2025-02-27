import { Editor } from '@tiptap/core';
import { ArrowRight, Trash } from 'lucide-react';
import { useState } from 'react';
import { SOCIALS_OPTIONS, useSocialState } from './use-social-state';

interface SocialBubbleMenuContentProps {
  editor: Editor;
}

export const SocialBubbleMenuContent = ({
  editor,
}: SocialBubbleMenuContentProps) => {
  const { socials, useMonochrome, size } = useSocialState(editor);
  const [draftUrls, setDraftUrls] = useState<Record<number, string>>({});

  const updateSocialIcon = (index: number, loadedIcon: string) => {
    const currentSocials = [...(socials || [])];
    const social = currentSocials[index];
    social.icon = loadedIcon;
    editor.commands.setSocials(currentSocials);
  };

  const addSocial = async (type: keyof typeof SOCIALS_OPTIONS) => {
    const defaultUrl = SOCIALS_OPTIONS[type].url;
    let icon = SOCIALS_OPTIONS[type].icon;

    editor.commands.addSocial({
      type,
      url: defaultUrl,
      icon,
    });
  };

  const removeSocial = (index: number) => {
    editor.commands.removeSocial(index);
    const newDraftUrls = { ...draftUrls };
    delete newDraftUrls[index];
    setDraftUrls(newDraftUrls);
  };

  const updateSocialUrl = async (
    index: number,
    url: string,
    submit = false
  ) => {
    if (submit) {
      const currentSocials = [...(socials || [])];
      const social = currentSocials[index];

      if (social.type === 'custom') {
        try {
          const domain = new URL(url).hostname;
          social.icon = `https://${domain}/favicon.ico`;
        } catch {
          social.icon = SOCIALS_OPTIONS.custom.icon;
        }
      }

      social.url = url;
      editor.commands.setSocials(currentSocials);

      // Clear draft
      const newDraftUrls = { ...draftUrls };
      delete newDraftUrls[index];
      setDraftUrls(newDraftUrls);
    } else {
      // Store in draft
      setDraftUrls({ ...draftUrls, [index]: url });
    }
  };

  const toggleMonochrome = () => {
    editor.commands.updateAttributes('socials', {
      useMonochrome: !useMonochrome,
    });
  };

  const updateSize = (newSize: number) => {
    editor.commands.updateAttributes('socials', {
      size: Math.max(16, Math.min(48, newSize)),
    });
  };

  return (
    <div className="mly-flex mly-flex-col mly-gap-3 mly-rounded-lg mly-bg-white mly-p-3 mly-shadow-lg">
      <div className="mly-grid mly-grid-cols-4 mly-gap-2">
        {(
          Object.keys(SOCIALS_OPTIONS) as Array<keyof typeof SOCIALS_OPTIONS>
        ).map((type) => (
          <button
            key={type}
            onClick={() => addSocial(type)}
            className="mly-flex mly-flex-col mly-items-center mly-gap-1 mly-rounded-lg mly-p-2 mly-transition-colors hover:mly-bg-gray-50"
          >
            <div className="mly-flex mly-h-8 mly-w-8 mly-items-center mly-justify-center mly-rounded-full mly-bg-gray-100">
              <img
                src={SOCIALS_OPTIONS[type].icon}
                alt={type}
                className="mly-h-5 mly-w-5"
              />
            </div>
            <span className="mly-text-xs mly-text-gray-600">{type}</span>
          </button>
        ))}
      </div>

      {socials && socials.length > 0 && (
        <div className="mly-flex mly-flex-col mly-gap-2 mly-border-t mly-pt-2">
          {socials.map((social, index) => (
            <div key={index} className="mly-flex mly-items-center mly-gap-2">
              <div className="mly-flex mly-h-8 mly-w-8 mly-items-center mly-justify-center mly-rounded-full mly-bg-gray-100">
                <img
                  src={
                    social.icon ||
                    SOCIALS_OPTIONS[social.type].icon ||
                    SOCIALS_OPTIONS.custom.icon
                  }
                  alt={social.type}
                  className="mly-h-4 mly-w-4"
                  onError={(e) => {
                    e.currentTarget.src = SOCIALS_OPTIONS.website.icon;
                    if (social.type === 'custom') {
                      updateSocialIcon(index, SOCIALS_OPTIONS.website.icon);
                    }
                  }}
                  onLoad={(e) => {
                    if (
                      social.type === 'custom' &&
                      e.currentTarget.src !== SOCIALS_OPTIONS.website.icon
                    ) {
                      updateSocialIcon(index, e.currentTarget.src);
                    }
                  }}
                />
              </div>
              <div className="mly-flex mly-flex-1 mly-items-center mly-gap-2">
                <input
                  type="url"
                  value={draftUrls[index] ?? social.url}
                  onChange={(e) => updateSocialUrl(index, e.target.value)}
                  className="focus:mly-border-primary focus:mly-ring-primary mly-flex-1 mly-rounded mly-border mly-px-2 mly-py-1 mly-text-sm focus:mly-outline-none focus:mly-ring-1"
                  placeholder={`Enter ${social.type} URL...`}
                />
                {social.type === 'custom' && draftUrls[index] && (
                  <button
                    onClick={() =>
                      updateSocialUrl(index, draftUrls[index], true)
                    }
                    className="mly-rounded mly-p-1.5 mly-text-gray-400 hover:mly-bg-gray-100 hover:mly-text-gray-600"
                  >
                    <ArrowRight className="mly-h-4 mly-w-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => removeSocial(index)}
                className="mly-rounded mly-p-1.5 mly-text-gray-400 hover:mly-bg-gray-100 hover:mly-text-gray-600"
              >
                <Trash className="mly-h-4 mly-w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mly-flex mly-items-center mly-gap-2">
        <label className="mly-flex mly-items-center mly-gap-2 mly-text-sm mly-text-gray-600">
          <input
            type="checkbox"
            checked={useMonochrome}
            onChange={toggleMonochrome}
            className="mly-rounded"
          />
          Black & White Icons
        </label>
      </div>

      <div className="mly-flex mly-flex-col mly-gap-2 mly-border-t mly-pt-2">
        <div className="mly-flex mly-items-center mly-gap-2">
          <label className="mly-text-sm mly-text-gray-600">Icon Size:</label>
          <input
            type="number"
            value={size}
            onChange={(e) => updateSize(parseInt(e.target.value))}
            min="16"
            max="48"
            className="mly-w-20 mly-rounded mly-border mly-px-2 mly-py-1 mly-text-sm"
          />
          <span className="mly-text-sm mly-text-gray-400">px</span>
        </div>
      </div>
    </div>
  );
};
