import { TextSelection } from '@tiptap/pm/state';
import { ImageIcon } from 'lucide-react';
import type { BlockItem } from './types';

export const image: BlockItem = {
  title: 'Image',
  description: 'Full width image',
  searchTerms: ['image'],
  icon: <ImageIcon className="mly-h-4 mly-w-4" />,
  command: ({ editor, range }) => {
    // Insert empty image first
    editor.chain().focus().deleteRange(range).setImage({ src: '' }).run();

    // The bubble menu will automatically appear, allowing the user to:
    // 1. Upload an image via the upload button
    // 2. Add an external URL via the link input
  },
};

export const logo: BlockItem = {
  title: 'Logo',
  description: 'Add your brand logo',
  searchTerms: ['image', 'logo'],
  icon: <ImageIcon className="mly-h-4 mly-w-4" />,
  command: ({ editor, range }) => {
    // @ts-ignore
    editor.chain().focus().deleteRange(range).setLogoImage({ src: '' }).run();
  },
};

export const inlineImage: BlockItem = {
  title: 'Inline Image',
  description: 'Inline image',
  searchTerms: ['image', 'inline'],
  icon: <ImageIcon className="mly-h-4 mly-w-4" />,
  command: ({ editor, range }) => {
    // @ts-ignore
    editor
      .chain()
      .focus()
      .deleteRange(range)
      // @ts-ignore
      .setInlineImage({
        src: '',
      })
      // @ts-ignore
      .command((props) => {
        const { tr, state, view, editor } = props;
        const { from } = range;

        const node = state.doc.nodeAt(from);
        if (!node) {
          return false;
        }

        const selection = TextSelection.create(
          tr.doc,
          from,
          from + node.nodeSize
        );
        tr.setSelection(selection);
        return true;
      })
      .run();
  },
};
