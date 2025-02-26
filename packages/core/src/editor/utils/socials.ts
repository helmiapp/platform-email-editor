import { Editor } from '@tiptap/react';

export function getSelectedSocials(editor: Editor) {
  const selectedSocials = editor.getAttributes('social');
  return selectedSocials;
}
