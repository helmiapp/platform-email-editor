import { Node, nodeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { UploadImageNode } from './upload-image';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    uploadImage: {
      uploadImage: () => ReturnType;
    };
  }
}

export interface UploadImageOptions {
  HTMLAttributes?: Record<string, unknown>;
  uploadImage: (file: File) => Promise<string>;
}

export const UploadImage = Node.create<UploadImageOptions>({
  name: 'uploadImage',

  group: 'block',
  atom: true,

  draggable: true,

  addKeyboardShortcuts() {
    return {
      uploadImage: () => this.editor.commands.uploadImage(),
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      uploadMode: {
        default: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="upload-image"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'upload-image', ...HTMLAttributes }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(UploadImageNode);
  },

  addCommands() {
    return {
      uploadImage:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { uploadMode: true },
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /imageUpload$/,
        type: this.type,
        getAttributes: () => ({ uploadMode: true, src: null, alt: null }),
      }),
    ];
  },
});
