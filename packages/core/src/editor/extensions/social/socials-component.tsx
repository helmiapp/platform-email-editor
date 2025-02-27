import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

export function SocialsComponent(props: NodeViewProps) {
  return (
    <NodeViewWrapper>
      <div
        className="mly-flex mly-flex-wrap mly-items-center mly-gap-4 mly-py-4"
        data-drag-handle
      >
        {props.node.content ? props.node.children : null}
      </div>
    </NodeViewWrapper>
  );
}
