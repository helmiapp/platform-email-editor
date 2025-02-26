import { SOCIAL_ICONS } from '@/editor/components/social-menu/use-social-state';
import { Share2 } from 'lucide-react';
import type { BlockItem } from './types';

export const social: BlockItem = {
  title: 'Social Media',
  description: 'Add social media links',
  searchTerms: ['social', 'media', 'links'],
  icon: <Share2 className="mly-h-4 mly-w-4" />,
  command: ({ editor, range }) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertContent({
        type: 'columns',
        attrs: {
          showIfKey: null,
          gap: 8,
          isSocialMedia: true,
        },
        content: Object.entries(SOCIAL_ICONS).map(([platform, iconUrl]) => ({
          type: 'column',
          attrs: {
            columnId: crypto.randomUUID(),
            width: 'auto',
            verticalAlign: 'middle',
          },
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'center', showIfKey: null },
              content: [
                {
                  type: 'inlineImage',
                  attrs: {
                    height: 24,
                    width: 24,
                    src: iconUrl,
                    isSrcVariable: false,
                    alt: platform,
                    title: platform,
                    externalLink: '',
                    isExternalLinkVariable: false,
                  },
                },
                { type: 'hardBreak' },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: '',
                        target: '_blank',
                        rel: 'noopener noreferrer nofollow',
                        class: 'mly-no-underline',
                        isUrlVariable: false,
                      },
                    },
                  ],
                  text: platform,
                },
              ],
            },
          ],
        })),
      })
      .run();
  },
};
