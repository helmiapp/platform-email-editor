import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { SocialView } from '../../nodes/social/social-view';

export interface Social {
  type: string;
  url: string;
  icon?: string;
  useMonochrome?: boolean;
  size?: number;
}

export interface SocialsOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    socials: {
      setSocials: (socials: Social[]) => ReturnType;
      addSocial: (social: {
        type: string;
        url: string;
        icon?: string;
      }) => ReturnType;
      removeSocial: (index: number) => ReturnType;
    };
  }
}

export const SocialExtension = Node.create<SocialsOptions>({
  name: 'socials',

  group: 'block',

  draggable: true,

  content: '',

  selectable: true,

  addAttributes() {
    return {
      socials: {
        default: [],
      },
      useMonochrome: {
        default: false,
      },
      size: {
        default: 20,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="socials"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        { 'data-type': 'socials', class: 'social-node' },
        HTMLAttributes
      ),
      0,
    ];
  },

  addCommands() {
    return {
      setSocials:
        (socials: Social[]) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { socials });
        },

      addSocial:
        (social: Social) =>
        ({ commands, editor }) => {
          const currentSocials = editor.getAttributes(this.name).socials || [];
          return commands.updateAttributes(this.name, {
            socials: [...currentSocials, social],
          });
        },

      removeSocial:
        (index: number) =>
        ({ commands, editor }) => {
          const currentSocials = [
            ...(editor.getAttributes(this.name).socials || []),
          ];
          currentSocials.splice(index, 1);
          return commands.updateAttributes(this.name, {
            socials: currentSocials,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(SocialView, {
      className: 'mly-relative',
    });
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { empty, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;

        if (!empty || !isAtStart) {
          return false;
        }

        return this.editor.commands.deleteNode(this.name);
      },
    };
  },
});
