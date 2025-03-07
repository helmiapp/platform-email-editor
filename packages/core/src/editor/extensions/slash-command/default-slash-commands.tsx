import { image, social } from '@/blocks';
import { button, linkCard } from '@/blocks/button';
import {
  headerLogoWithTextHorizontal,
  headerLogoWithTextVertical,
} from '@/blocks/headers';
import { columns, divider, section, spacer } from '@/blocks/layout';
import { bulletList, orderedList } from '@/blocks/list';
import { table } from '@/blocks/table';
import { BlockGroupItem } from '@/blocks/types';
import {
  blockquote,
  clearLine,
  footer,
  hardBreak,
  heading1,
  heading2,
  heading3,
  text,
} from '@/blocks/typography';
import { Heading1 } from 'lucide-react';

export const DEFAULT_SLASH_COMMANDS: BlockGroupItem[] = [
  {
    title: 'Blocks',
    commands: [
      text,
      heading1,
      heading2,
      heading3,
      bulletList,
      orderedList,
      image,
      // logo,
      // inlineImage,
      columns,
      section,
      table,
      social,
      // repeat,
      divider,
      spacer,
      button,
      linkCard,
      hardBreak,
      blockquote,
      footer,
      clearLine,
    ],
  },
  {
    title: 'Components',
    commands: [
      {
        id: 'headers',
        title: 'Headers',
        description: 'Add pre-designed headers block',
        searchTerms: ['header', 'headers'],
        icon: <Heading1 className="mly-h-4 mly-w-4" />,
        commands: [
          headerLogoWithTextVertical,
          headerLogoWithTextHorizontal,
          // headerLogoWithCoverImage,
        ],
      },
      // {
      //   id: 'footers',
      //   title: 'Footers',
      //   description: 'Add pre-designed footers block',
      //   searchTerms: ['footers'],
      //   icon: <FootprintsIcon className="mly-h-4 mly-w-4" />,
      //   commands: [
      //     footerCopyrightText,
      //     footerCommunityFeedbackCta,
      //     footerCompanySignature,
      //   ],
      // },
      // htmlCodeBlock,
    ],
  },
];
