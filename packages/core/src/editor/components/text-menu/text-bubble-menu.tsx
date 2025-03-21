import { ColumnExtension } from '@/editor/nodes/columns/column';
import { ColumnsExtension } from '@/editor/nodes/columns/columns';
import { RepeatExtension } from '@/editor/nodes/repeat/repeat';
import { SectionExtension } from '@/editor/nodes/section/section';
import { isCustomNodeSelected } from '@/editor/utils/is-custom-node-selected';
import { isTextSelected } from '@/editor/utils/is-text-selected';
import { BubbleMenu, BubbleMenuProps } from '@tiptap/react';
import { LucideIcon } from 'lucide-react';
import { SVGIcon } from '../icons/grid-lines';
import { Divider } from '../ui/divider';
import { TooltipProvider } from '../ui/tooltip';
import { TextBubbleContent } from './text-bubble-content';
import { TurnIntoBlock } from './turn-into-block';
import { useTurnIntoBlockOptions } from './use-turn-into-block-options';

export interface BubbleMenuItem {
  name?: string;
  isActive?: () => boolean;
  command?: () => void;
  shouldShow?: () => boolean;
  icon?: LucideIcon | SVGIcon;
  className?: string;
  iconClassName?: string;
  nameClassName?: string;
  disbabled?: boolean;

  tooltip?: string;
}

export type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'> & {
  appendTo?: React.RefObject<any>;
};

export const TextBubbleMenu = (props: EditorBubbleMenuProps) => {
  const { editor, appendTo } = props;

  if (!editor) {
    return null;
  }

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    ...(appendTo ? { appendTo: appendTo.current } : {}),
    shouldShow: ({ editor, state, from, to }) => {
      const { selection } = state;
      const { empty } = selection;

      // Don't show if selection is empty or editor is not editable
      if (empty || !editor.isEditable) {
        return false;
      }

      // Don't show if a social node is selected
      if (editor.isActive('socials')) {
        return false;
      }

      const domAtPos = editor.view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = editor.view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      if (isCustomNodeSelected(editor, node) || !editor.isEditable) {
        return false;
      }

      const nestedNodes = [
        RepeatExtension.name,
        SectionExtension.name,
        ColumnsExtension.name,
        ColumnExtension.name,
      ];

      const isNestedNodeSelected =
        nestedNodes.some((name) => editor.isActive(name)) &&
        node?.classList?.contains('ProseMirror-selectednode');
      return isTextSelected(editor) && !isNestedNodeSelected;
    },
    tippyOptions: {
      popperOptions: {
        placement: 'top-start',
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
              padding: 8,
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'],
            },
          },
        ],
      },
      maxWidth: '100%',
    },
  };

  const turnIntoBlockOptions = useTurnIntoBlockOptions(editor);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="mly-flex mly-gap-0.5 mly-rounded-lg mly-border mly-border-slate-200 mly-bg-white mly-p-0.5 mly-shadow-md"
    >
      <TooltipProvider>
        <TurnIntoBlock options={turnIntoBlockOptions} />

        <Divider className="mly-mx-0" />

        <TextBubbleContent editor={editor} />
      </TooltipProvider>
    </BubbleMenu>
  );
};
