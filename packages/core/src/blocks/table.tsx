import { TableIcon } from 'lucide-react';
import type { BlockItem } from './types';

export const table: BlockItem = {
  title: 'Table',
  description: 'Insert a table',
  searchTerms: ['table', 'grid'],
  icon: <TableIcon className="mly-h-4 mly-w-4" />,
  command: ({ editor, range }) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: true, // Enable header row by default
      })
      .run();
  },
};
