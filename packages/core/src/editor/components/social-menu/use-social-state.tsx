import { getColumnWidths } from '@/editor/utils/columns';

import { Editor, useEditorState } from '@tiptap/react';
import deepEql from 'fast-deep-equal';

export const SOCIAL_ICONS = {
  facebook: 'https://cdn.usemaily.com/images/icons/facebook.png',
  twitter: 'https://cdn.usemaily.com/images/icons/twitter.png',
  instagram: 'https://cdn.usemaily.com/images/icons/instagram.png',
  linkedin: 'https://cdn.usemaily.com/images/icons/linkedin.png',
  youtube: 'https://cdn.usemaily.com/images/icons/youtube.png',
};

export const useSocialState = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        currentVerticalAlignment:
          ctx.editor.getAttributes('column')?.verticalAlign || 'top',

        columnWidths: getColumnWidths(ctx.editor).map((c) => c.width),
      };
    },
    equalityFn: deepEql,
  });

  return states;
};
