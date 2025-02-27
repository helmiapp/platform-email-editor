import { Editor } from '@tiptap/react';

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  url: string;
  isCustom?: boolean;
}

export const DEFAULT_SOCIALS: Record<string, Omit<SocialPlatform, 'url'>> = {
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    icon: 'https://cdn.usemaily.com/images/icons/facebook.png',
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter',
    icon: 'https://cdn.usemaily.com/images/icons/twitter.png',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    icon: 'https://cdn.usemaily.com/images/icons/instagram.png',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'https://cdn.usemaily.com/images/icons/linkedin.png',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    icon: 'https://cdn.usemaily.com/images/icons/youtube.png',
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram',
    icon: 'https://cdn.usemaily.com/images/icons/telegram.png',
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'https://cdn.usemaily.com/images/icons/whatsapp.png',
  },
};

export function useSocialState(editor: Editor) {
  const node = editor.state.selection.$anchor.node();
  if (!node || (node.type.name !== 'socials' && node.type.name !== 'social')) {
    return null;
  }

  const isParentSocials = node.type.name === 'socials';
  const socialsNode = isParentSocials
    ? node
    : editor.state.selection.$anchor.node(-1);

  const activeSocials = socialsNode.content.content.map((social: any) => ({
    id: social.attrs.platformId,
    name: social.attrs.name,
    icon: social.attrs.icon,
    url: social.attrs.url,
    isCustom: social.attrs.isCustom,
  }));

  const addSocial = (platform: SocialPlatform) => {
    editor.chain().focus().addSocial(platform).run();
  };

  const updateSocial = (id: string, updates: Partial<SocialPlatform>) => {
    editor.chain().focus().updateSocial(id, updates).run();
  };

  const removeSocial = (id: string) => {
    editor.chain().focus().removeSocial(id).run();
  };

  return {
    activeSocials,
    addSocial,
    updateSocial,
    removeSocial,
    selectedSocialId:
      node.type.name === 'social' ? node.attrs.platformId : null,
  };
}
