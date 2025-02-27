import { Editor } from '@tiptap/react';
import { getClosestNodeByName } from './columns';

export function addSocial(editor: Editor, type: string, url: string) {
  const { state, dispatch } = editor.view;
  const { tr } = state;

  const { node: socialNode, pos: socialNodePos = 0 } =
    getClosestNodeByName(editor, 'social') || {};
  if (!socialNode) {
    return;
  }

  const social = state.schema.nodes.social.create({
    type: type,
    url: url,
  });

  tr.replaceWith(socialNodePos, socialNodePos + socialNode.nodeSize, social);
  dispatch(tr);
  editor.view.focus();
}

export function removeSocial(editor: Editor) {
  const { state, dispatch } = editor.view;
  const { tr } = state;

  const { node: socialNode, pos: socialNodePos = 0 } =
    getClosestNodeByName(editor, 'social') || {};
  if (!socialNode) {
    return;
  }

  tr.delete(socialNodePos, socialNodePos + socialNode.nodeSize);
  dispatch(tr);
  editor.view.focus();
}
