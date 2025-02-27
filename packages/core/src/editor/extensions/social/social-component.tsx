import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

export function SocialComponent(props: NodeViewProps) {
  const { platformId, name, icon, url } = props.node.attrs;

  return (
    <NodeViewWrapper>
      <div className="mly-flex mly-flex-col mly-items-center mly-gap-2">
        <img
          src={icon}
          alt={name}
          className="mly-h-8 mly-w-8 mly-object-contain"
          draggable={false}
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mly-text-sm mly-text-gray-600 hover:mly-text-gray-900"
        >
          {name}
        </a>
      </div>
    </NodeViewWrapper>
  );
}
