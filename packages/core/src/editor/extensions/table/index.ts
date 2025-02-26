import Table from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
// Custom table extension to handle table behavior
export const TableExtension = Table.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'mly-table mly-w-full mly-border-collapse mly-my-4',
      },
    };
  },
}).configure({
  resizable: true,
  allowTableNodeSelection: true,
});

export const TableRowExtension = TableRow.configure({
  HTMLAttributes: {
    class: 'mly-border mly-border-gray-200',
  },
});

export const TableHeaderExtension = TableHeader.configure({
  HTMLAttributes: {
    class:
      'mly-border mly-border-gray-200 mly-bg-gray-100 mly-p-2 mly-text-left',
  },
});

export const TableCellExtension = TableCell.configure({
  HTMLAttributes: {
    class: 'mly-border mly-border-gray-200 mly-p-2',
  },
});
