import { Maily, render } from './index';

describe('render', () => {
  it('should replace variables with values', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'variable',
              attrs: {
                id: 'name',
                fallback: 'Buddy',
              },
            },
          ],
        },
      ],
    };

    const maily = new Maily(content);
    maily.setVariableValue('name', 'John Doe');
    const result = await maily.render({
      plainText: true,
    });

    expect(result).toMatchInlineSnapshot(`"John Doe"`);
  });

  it('should replace variables with default formatted value', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'variable',
              attrs: {
                id: 'name',
                fallback: 'Buddy',
              },
            },
          ],
        },
      ],
    };
    const result = await render(content, {
      plainText: true,
    });
    expect(result).toMatchInlineSnapshot(`"{{name,fallback=Buddy}}"`);
  });

  it('should replace variables formatter with custom formatter', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'variable',
              attrs: {
                id: 'name',
                fallback: 'Buddy',
              },
            },
          ],
        },
      ],
    };

    const maily = new Maily(content);
    maily.setVariableFormatter((options) => {
      const { fallback, variable } = options;
      return `[${variable},fallback=${fallback}]`;
    });
    const result = await maily.render({
      plainText: true,
    });

    expect(result).toMatchInlineSnapshot(`"[name,fallback=Buddy]"`);
  });

  it('should replace variables with fallback value', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'variable',
              attrs: {
                id: 'name',
                fallback: 'Buddy',
              },
            },
          ],
        },
      ],
    };

    const maily = new Maily(content);
    maily.setShouldReplaceVariableValues(true);
    const result = await maily.render({
      plainText: true,
    });

    expect(result).toMatchInlineSnapshot(`"Buddy"`);
  });

  it('should replace links with setLinkValue value', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: {
            textAlign: 'left',
          },
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://maily.to',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'maily.to',
            },
          ],
        },
      ],
    };

    const maily = new Maily(content);
    maily.setLinkValue('https://maily.to', 'https://maily.to/playground');
    const result = await maily.render({
      plainText: true,
    });

    expect(result).toMatchInlineSnapshot(
      `"maily.to https://maily.to/playground"`
    );
  });

  it("should replace unsubscribe_url in button's href", async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'button',
          attrs: {
            mailyComponent: 'button',
            text: 'Unsubscribe',
            url: 'unsubscribe_url',
            isUrlVariable: true,
            alignment: 'left',
            variant: 'filled',
            borderRadius: 'smooth',
            buttonColor: 'rgb(0, 0, 0)',
            textColor: 'rgb(255, 255, 255)',
          },
        },
      ],
    };

    const maily = new Maily(content);
    maily.setVariableValue(
      'unsubscribe_url',
      'https://maily.to/unsubscribe_url'
    );
    const result = await maily.render({
      plainText: true,
    });

    expect(result).toMatchInlineSnapshot(
      `"Unsubscribe https://maily.to/unsubscribe_url"`
    );
  });

  it('should apply custom theme', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Custom Heading' }],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Custom Paragraph' }],
        },
      ],
    };

    const customTheme = {
      colors: {
        heading: 'rgb(255, 0, 0)',
        paragraph: 'rgb(0, 255, 0)',
      },
      fontSize: {
        paragraph: '18px',
      },
    };
    const maily = new Maily(content);
    maily.setTheme({
      colors: {
        heading: 'rgb(255, 0, 0)',
        paragraph: 'rgb(0, 255, 0)',
      },
      fontSize: {
        paragraph: {
          size: '18px',
          lineHeight: '1.5',
        },
      },
    });
    const result = await maily.render();

    expect(result).toContain('color:rgb(255, 0, 0)');
    expect(result).toContain('color:rgb(0, 255, 0)');
    expect(result).toContain('font-size:18px');
  });

  it('should render a table with header row', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'table',
          content: [
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  content: [{ type: 'text', text: 'Name' }],
                },
                {
                  type: 'tableHeader',
                  content: [{ type: 'text', text: 'Email' }],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableCell',
                  content: [{ type: 'text', text: 'John Doe' }],
                },
                {
                  type: 'tableCell',
                  content: [{ type: 'text', text: 'john@example.com' }],
                },
              ],
            },
          ],
        },
      ],
    };

    const maily = new Maily(content);
    maily.setTheme({
      colors: {
        paragraph: '#374151',
      },
      fontSize: {
        paragraph: {
          size: '14px',
          lineHeight: '20px',
        },
      },
    });

    const result = await maily.render();

    // Check table structure
    expect(result).toContain('<table');
    expect(result).toContain('<tbody>');
    expect(result).toContain('<tr');
    expect(result).toContain('<th');
    expect(result).toContain('<td');

    // Check content
    expect(result).toContain('Name');
    expect(result).toContain('Email');
    expect(result).toContain('John Doe');
    expect(result).toContain('john@example.com');

    // Check styling
    expect(result).toContain('border-collapse:separate');
    expect(result).toContain('border-spacing:0');
    expect(result).toContain('border:1px solid #e2e8f0');
    expect(result).toContain('background-color:#f8f8f8'); // Header background
    expect(result).toContain('border-bottom:1px solid #e9e9e9');
    expect(result).toContain('font-size:14px');
    expect(result).toContain('line-height:20px');
    expect(result).toContain('color:#374151'); // Theme color
  });
});
