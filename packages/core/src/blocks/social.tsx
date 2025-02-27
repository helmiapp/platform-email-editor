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
        type: 'socials',
        attrs: { showIfKey: null },
      })
      .run();
  },
};
