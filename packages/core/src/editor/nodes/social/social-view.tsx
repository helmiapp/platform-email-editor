import { Social } from '@/editor/extensions/social';
import { cn } from '@/editor/utils/classname';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { Share2 } from 'lucide-react';
import { SOCIALS_OPTIONS } from '../../components/social-menu/use-social-state';

export function SocialView(props: NodeViewProps) {
  const { editor, node, selected } = props;
  const socials = node.attrs.socials || [];
  const size = node.attrs.size || 20;
  const useMonochrome = node.attrs.useMonochrome || false;

  const getIconUrl = (social: Social) => {
    if (social.icon) {
      return social.icon;
    }
    return (
      social.icon ||
      SOCIALS_OPTIONS[social.type as keyof typeof SOCIALS_OPTIONS]?.icon ||
      SOCIALS_OPTIONS.website.icon
    );
  };

  return (
    <NodeViewWrapper
      as="div"
      data-type="socials"
      draggable={editor.isEditable}
      data-drag-handle={editor.isEditable}
      onClick={() => {
        if (!selected) {
          editor.commands.setNodeSelection(props.getPos());
        }
      }}
      className={cn(
        'mly-relative mly-my-4 mly-flex mly-items-center mly-justify-center mly-overflow-hidden mly-rounded-lg mly-border-2 mly-border-dashed mly-border-gray-200 mly-bg-transparent mly-p-4 hover:mly-border-gray-300',
        selected && 'mly-border-primary mly-ring-primary mly-ring-1',
        'social-node'
      )}
    >
      {socials.length === 0 ? (
        <div className="mly-flex mly-items-center mly-gap-2 mly-text-gray-400">
          <Share2 className="mly-h-4 mly-w-4" />
          <span className="mly-text-sm">Click to add social media links</span>
        </div>
      ) : (
        <div className="mly-flex mly-flex-wrap mly-gap-3">
          {socials.map((social: Social, index: number) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mly-group mly-flex mly-items-center mly-justify-center mly-rounded-full mly-border mly-border-gray-200 mly-bg-white mly-shadow-sm mly-transition-all mly-duration-200 mly-ease-in-out hover:mly-border-gray-300 hover:mly-bg-gray-50"
              style={{
                width: size * 2,
                height: size * 2,
              }}
            >
              <img
                src={getIconUrl(social)}
                alt={social.type}
                className={cn(
                  '!mly-m-0 mly-rounded-full mly-object-cover mly-object-center mly-opacity-80 group-hover:mly-opacity-100',
                  useMonochrome && 'mly-contrast-200 mly-grayscale'
                )}
                style={{
                  width: size,
                  height: size,
                }}
                onError={(e) => {
                  e.currentTarget.src = SOCIALS_OPTIONS.website.icon;
                }}
              />
            </a>
          ))}
        </div>
      )}
    </NodeViewWrapper>
  );
}
