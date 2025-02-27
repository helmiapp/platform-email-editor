import { BubbleMenu } from '@tiptap/react';
import { sticky } from 'tippy.js';
import { EditorBubbleMenuProps } from '../text-menu/text-bubble-menu';
import { SocialBubbleMenuContent } from './social-bubble-menu-content';

export function SocialBubbleMenu(props: EditorBubbleMenuProps) {
  const { appendTo, editor } = props;
  if (!editor) return null;

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    ...(appendTo ? { appendTo: appendTo.current } : {}),
    shouldShow: ({ editor }) => {
      if (!editor.isEditable) return false;
      return editor.isActive('social');
    },
    tippyOptions: {
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      appendTo: () => appendTo?.current,
      plugins: [sticky],
      sticky: 'popper',
      maxWidth: 'auto',
    },
    pluginKey: 'socialBubbleMenu',
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="mly-rounded-lg mly-border mly-border-slate-200 mly-bg-white mly-p-0.5 mly-shadow-md"
    >
      <SocialBubbleMenuContent editor={editor} />
    </BubbleMenu>
  );
}
