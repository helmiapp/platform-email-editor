import { Editor, useEditorState } from '@tiptap/react';
import deepEql from 'fast-deep-equal';

export const SOCIALS_OPTIONS = {
  website: {
    icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png',
    url: '',
  },
  facebook: {
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png',
    url: 'https://www.facebook.com/',
  },
  twitter: {
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968830.png',
    url: 'https://twitter.com/',
  },
  instagram: {
    icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
    url: 'https://www.instagram.com/',
  },
  linkedin: {
    icon: 'https://cdn-icons-png.flaticon.com/512/4138/4138130.png',
    url: 'https://www.linkedin.com/',
  },
  youtube: {
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174883.png',
    url: 'https://www.youtube.com/',
  },
  telegram: {
    icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png',
    url: 'https://telegram.org/',
  },
  custom: {
    icon: 'https://cdn-icons-png.flaticon.com/512/471/471664.png',
    url: '',
  },
} as const;

export interface SocialState {
  socials: Array<{
    type: string;
    url: string;
    icon?: string;
    size?: number;
  }>;
  size?: number;
}

export const useSocialState = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: ({ editor }) => {
      const attrs = editor.getAttributes('socials');
      const useMonochrome = attrs.useMonochrome || false;

      return {
        socials: attrs.socials,
        size: attrs.size || 20,
        useMonochrome,
      };
    },

    equalityFn: deepEql,
  });

  return states;
};

export const getImage = async (url: string): Promise<string> => {
  try {
    const domain = new URL(url).hostname;
    const faviconUrl = `https://${domain}/favicon.ico`;

    // Test if favicon exists
    const response = await fetch(faviconUrl, { method: 'HEAD' });

    console.log(faviconUrl, response);
    if (!response.ok) {
      throw new Error('Favicon not found');
    }

    return faviconUrl;
  } catch {
    return SOCIALS_OPTIONS.website.icon;
  }
};
