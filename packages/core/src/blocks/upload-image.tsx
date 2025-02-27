import { BlockItem } from '@/blocks/types';
import { UploadCloud } from 'lucide-react';

export const UploadImageBlock: BlockItem = {
  title: 'Upload Image',
  description: 'Full width image',
  searchTerms: ['image', 'upload image'],
  icon: <UploadCloud className="size-4" />,
  command: ({ editor, range }) => {
    if (!editor.storage.uploadImage?.options.uploadImage) {
      console.error('Upload image function not configured');
      return;
    }
    editor.chain().focus().deleteRange(range).uploadImage().run();
  },
};
