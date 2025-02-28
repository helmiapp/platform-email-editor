import { DEFAULT_LOGO_SIZE } from '@/editor/nodes/logo/logo';
import { Editor, useEditorState } from '@tiptap/react';
import deepEql from 'fast-deep-equal';

export const useImageState = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: ({ editor }) => {
      const imageAttrs = editor.getAttributes('image');
      return {
        width: imageAttrs.width,
        height: imageAttrs.height,
        isImageActive: editor.isActive('image'),
        isLogoActive: editor.isActive('logo'),
        alignment:
          imageAttrs?.alignment || editor.getAttributes('logo')?.alignment,
        isMaxWidth: imageAttrs?.isMaxWidth || false,
        logoSize: editor.getAttributes('logo')?.size || DEFAULT_LOGO_SIZE,
        imageSrc: imageAttrs?.src || editor.getAttributes('logo')?.src || '',
        isSrcVariable:
          imageAttrs?.isSrcVariable ??
          editor.getAttributes('logo')?.isSrcVariable ??
          false,
        imageExternalLink: imageAttrs?.externalLink || '',
        isExternalLinkVariable: imageAttrs?.isExternalLinkVariable,

        currentShowIfKey:
          imageAttrs?.showIfKey ||
          editor.getAttributes('logo')?.showIfKey ||
          '',
      };
    },
    equalityFn: deepEql,
  });

  return states;
};
