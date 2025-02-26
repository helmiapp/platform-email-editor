import Placeholder from '@tiptap/extension-placeholder';

export const PlaceholderExtension = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === 'heading') {
      return `Heading ${node.attrs.level}`;
    } else if (node.type.name === 'htmlCodeBlock') {
      return 'Type your HTML code...';
    } else if (
      [
        'columns',
        'column',
        'section',
        'repeat',
        'show',
        'blockquote',
        'table',
        'tableRow',
        'tableCell',
        'tableHeader',
      ].includes(node.type.name)
    ) {
      return '';
    }

    return 'Write something or / to see commands';
  },
  includeChildren: false, // Was true, but it messes with the table tiptap extension, because each cell has p inside
});
