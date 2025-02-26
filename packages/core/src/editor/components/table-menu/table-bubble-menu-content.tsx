import {
  ArrowDown,
  ArrowUp,
  Asterisk,
  Divide,
  Sidebar,
  Trash2,
} from 'lucide-react';
import { BubbleMenuButton } from '../bubble-menu-button';
import { EditorBubbleMenuProps } from '../text-menu/text-bubble-menu';
import { TooltipProvider } from '../ui/tooltip';

type TableBubbleMenuContentProps = {
  editor: EditorBubbleMenuProps['editor'];
};

export function TableBubbleMenuContent(props: TableBubbleMenuContentProps) {
  const { editor } = props;
  if (!editor) return null;

  return (
    <TooltipProvider>
      <div className="mly-flex mly-items-stretch mly-gap-2">
        {/* Row Controls */}
        <div className="mly-flex mly-flex-col mly-items-start mly-gap-1">
          <span className="mly-px-2 mly-text-xs mly-font-medium">Rows</span>
          <div className="mly-flex mly-items-center mly-gap-1">
            <BubbleMenuButton
              icon={ArrowUp}
              tooltip="Add Row Before"
              command={() => editor.chain().focus().addRowBefore().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">Before</span>
            </BubbleMenuButton>
            <BubbleMenuButton
              icon={ArrowDown}
              tooltip="Add Row After"
              command={() => editor.chain().focus().addRowAfter().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">After</span>
            </BubbleMenuButton>
            <BubbleMenuButton
              icon={Trash2}
              tooltip="Delete Row"
              command={() => editor.chain().focus().deleteRow().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">Delete</span>
            </BubbleMenuButton>
          </div>
        </div>
        <div className="mly-w-[1px] mly-flex-1 mly-bg-gray-200" />

        {/* Column Controls */}
        <div className="mly-flex mly-flex-col mly-items-start mly-gap-1">
          <span className="mly-px-2 mly-text-xs mly-font-medium mly-text-gray-500">
            Columns
          </span>
          <div className="mly-flex mly-items-center mly-gap-1">
            <BubbleMenuButton
              icon={Sidebar}
              tooltip="Add Column Before"
              command={() => editor.chain().focus().addColumnBefore().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">Before</span>
            </BubbleMenuButton>
            <BubbleMenuButton
              icon={Sidebar}
              iconClassName="mly-rotate-180"
              tooltip="Add Column After"
              command={() => editor.chain().focus().addColumnAfter().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">After</span>
            </BubbleMenuButton>
            <BubbleMenuButton
              icon={Trash2}
              tooltip="Delete Column"
              command={() => editor.chain().focus().deleteColumn().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">Delete</span>
            </BubbleMenuButton>
          </div>
        </div>

        <div className="mly-w-[1px] mly-flex-1 mly-bg-gray-200" />

        {/* Cell Controls */}
        <div className="mly-flex mly-flex-col mly-items-start mly-gap-1">
          <span className="mly-px-2 mly-text-xs mly-font-medium mly-text-gray-500">
            Cells
          </span>
          <div className="mly-flex mly-items-center mly-gap-1">
            <BubbleMenuButton
              icon={Asterisk}
              tooltip="Merge Cells"
              command={() => editor.chain().focus().mergeCells().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">Merge</span>
            </BubbleMenuButton>
            <BubbleMenuButton
              icon={Divide}
              tooltip="Split Cell"
              command={() => editor.chain().focus().splitCell().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">Split</span>
            </BubbleMenuButton>
          </div>
        </div>

        <div className="mly-w-[1px] mly-flex-1 mly-bg-gray-200" />

        {/* Table Controls */}
        <div className="mly-flex mly-flex-col mly-items-start mly-gap-1">
          <span className="mly-px-2 mly-text-xs mly-font-medium mly-text-gray-500">
            Table
          </span>
          <div className="mly-flex mly-items-center">
            <BubbleMenuButton
              icon={Trash2}
              tooltip="Delete Table"
              command={() => editor.chain().focus().deleteTable().run()}
              className="mly-flex mly-gap-1"
            >
              <span className="mly-text-xs">Delete</span>
            </BubbleMenuButton>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
