import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { SocialComponent } from './social-component';
import { SocialsComponent } from './socials-component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    socials: {
      insertSocials: (attrs: { showIfKey: string }) => ReturnType;
      addSocial: (platform: SocialPlatform) => ReturnType;
      removeSocial: (id: string) => ReturnType;
      updateSocial: (id: string, attrs: Partial<SocialPlatform>) => ReturnType;
    };
  }
}

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  url: string;
  isCustom?: boolean;
}

export const SocialsExtension = Node.create({
  name: 'socials',

  group: 'block',
  content: 'social*',

  addAttributes() {
    return {
      showIfKey: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="socials"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'socials' }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SocialsComponent);
  },

  addCommands() {
    return {
      addSocial:
        (platform: SocialPlatform) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: 'social',
              attrs: {
                platformId: platform.id,
                name: platform.name,
                icon: platform.icon,
                url: platform.url,
                isCustom: platform.isCustom,
              },
            })
            .run();
        },
    };
  },
});

export const SocialExtension = Node.create({
  name: 'social',

  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      platformId: { default: '' },
      name: { default: '' },
      icon: { default: '' },
      url: { default: '' },
      isCustom: { default: false },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="social"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'social' }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SocialComponent);
  },
});
