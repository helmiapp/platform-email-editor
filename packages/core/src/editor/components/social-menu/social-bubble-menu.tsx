import { BubbleMenu } from '@tiptap/react';
import { sticky } from 'tippy.js';
import { EditorBubbleMenuProps } from '../text-menu/text-bubble-menu';
import { SocialBubbleMenuContent } from './social-bubble-menu-content';

export const SocialBubbleMenu = (props: EditorBubbleMenuProps) => {
  const { appendTo, editor } = props;
  if (!editor) {
    return null;
  }

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    ...(appendTo ? { appendTo: appendTo.current } : {}),
    shouldShow: ({ editor }) => {
      if (!editor.isEditable) return false;
      return editor.isActive('socials');
    },
    tippyOptions: {
      offset: [0, 8],
      placement: 'bottom',
      popperOptions: {
        modifiers: [
          { name: 'flip', enabled: true },
          { name: 'preventOverflow', enabled: true },
        ],
      },
      appendTo: () => appendTo?.current,
      plugins: [sticky],
      sticky: 'popper',
      maxWidth: 'none',
    },
    pluginKey: 'socialBubbleMenu',
  };

  return (
    <BubbleMenu {...bubbleMenuProps}>
      <SocialBubbleMenuContent editor={editor} />
    </BubbleMenu>
  );
};
