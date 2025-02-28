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

  addGlobalAttributes() {
    return [
      {
        types: ['tableCell', 'tableHeader'],
        attributes: {
          // Add selected state attribute
          selected: {
            default: false,
            parseHTML: (element) => element.dataset.selected === 'true',
            renderHTML: (attributes) => ({
              'data-selected': attributes.selected,
              class: attributes.selected ? 'mly-bg-blue-50' : '',
            }),
          },
        },
      },
    ];
  },
}).configure({
  resizable: true,
  allowTableNodeSelection: true,
  lastColumnResizable: false,
});

export const TableRowExtension = TableRow.configure({
  HTMLAttributes: {
    // class: 'mly-border mly-border-gray-200',
  },
});

export const TableHeaderExtension = TableHeader.configure({
  HTMLAttributes: {
    // class:
    // 'mly-border mly-border-gray-200 mly-bg-gray-100 mly-p-2 mly-text-left hover:mly-bg-gray-50',
  },
});

export const TableCellExtension = TableCell.configure({
  HTMLAttributes: {
    // class: 'mly-border mly-border-gray-200 mly-p-2 hover:mly-bg-gray-50',
  },
});
