import { AllowedLogoSize, allowedLogoSize } from '@/editor/nodes/logo/logo';
import { BubbleMenu } from '@tiptap/react';
import { ImageDown, Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { sticky } from 'tippy.js';
import { AlignmentSwitch } from '../alignment-switch';
import { EditorBubbleMenuProps } from '../text-menu/text-bubble-menu';

import { BaseButton } from '../base-button';
import { Divider } from '../ui/divider';
import { LinkInputPopover } from '../ui/link-input-popover';
import { Select } from '../ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { ImageSize } from './image-size';
import { useImageState } from './use-image-state';

export function ImageBubbleMenu(props: EditorBubbleMenuProps) {
  const { editor, appendTo } = props;
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const state = useImageState(editor);

  const handleUpload = async (file: File) => {
    const uploadImage = editor.storage.image?.uploadImage;
    if (!uploadImage) {
      console.error('Upload image function not configured');
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(file);
      editor.chain().focus().updateAttributes('image', { src: imageUrl }).run();
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await handleUpload(file);
      }
    };
    input.click();
  };

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    ...(appendTo ? { appendTo: appendTo.current } : {}),
    shouldShow: ({ editor }) => {
      if (!editor.isEditable) {
        return false;
      }

      return editor.isActive('logo') || editor.isActive('image');
    },
    tippyOptions: {
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      plugins: [sticky],
      sticky: 'popper',
      maxWidth: '100%',
    },
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="mly-flex mly-items-center mly-gap-0.5 mly-rounded-lg mly-border mly-border-slate-200 mly-bg-white mly-p-0.5 mly-shadow-md"
    >
      <TooltipProvider>
        {state.isLogoActive && state.imageSrc && (
          <>
            <Select
              label="Size"
              tooltip="Size"
              value={state.logoSize}
              options={allowedLogoSize.map((size) => ({
                value: size,
                label: size,
              }))}
              onValueChange={(value) => {
                editor
                  ?.chain()
                  .focus()
                  .setLogoAttributes({ size: value as AllowedLogoSize })
                  .run();
              }}
            />

            <Divider />
          </>
        )}

        <div className="mly-flex mly-items-center mly-gap-0.5">
          <AlignmentSwitch
            alignment={state.alignment}
            onAlignmentChange={(alignment) => {
              const isCurrentNodeImage = state.isImageActive;
              if (!isCurrentNodeImage) {
                editor?.chain().focus().setLogoAttributes({ alignment }).run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .updateAttributes('image', { alignment })
                  .run();
              }
            }}
          />

          <LinkInputPopover
            defaultValue={state?.imageSrc ?? ''}
            onValueChange={(value, isVariable) => {
              if (state.isLogoActive) {
                editor
                  ?.chain()
                  .setLogoAttributes({
                    src: value,
                    isSrcVariable: isVariable ?? false,
                  })
                  .run();
              } else {
                editor
                  ?.chain()
                  .updateAttributes('image', {
                    src: value,
                    isSrcVariable: isVariable ?? false,
                  })
                  .run();
              }
            }}
            tooltip="Source URL"
            icon={ImageDown}
            editor={editor}
            isVariable={state.isSrcVariable}
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <BaseButton
                variant="ghost"
                size="sm"
                onClick={handleFileSelect}
                disabled={isUploading}
                className="mly-size-7"
              >
                {isUploading ? (
                  <Loader2 className="animate-spin mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5] mly-text-midnight-gray" />
                ) : (
                  <Upload className="mly-h-3 mly-w-3 mly-shrink-0 mly-stroke-[2.5] mly-text-midnight-gray" />
                )}
              </BaseButton>
            </TooltipTrigger>
            <TooltipContent>Upload Image</TooltipContent>
          </Tooltip>

          {state.isImageActive && (
            <LinkInputPopover
              defaultValue={state?.imageExternalLink ?? ''}
              onValueChange={(value, isVariable) => {
                editor
                  ?.chain()
                  .updateAttributes('image', {
                    externalLink: value,
                    isExternalLinkVariable: isVariable ?? false,
                  })
                  .run();
              }}
              tooltip="External URL"
              editor={editor}
              isVariable={state.isExternalLinkVariable}
            />
          )}
        </div>

        {state.isImageActive && state.imageSrc && (
          <>
            <Divider />

            <div className="mly-flex mly-space-x-0.5">
              <ImageSize
                dimension="width"
                value={state?.width ?? 0}
                onValueChange={(value) => {
                  editor
                    ?.chain()
                    .updateAttributes('image', { width: value })
                    .run();
                }}
              />
              <ImageSize
                dimension="height"
                value={state?.height ?? 0}
                onValueChange={(value) => {
                  editor
                    ?.chain()
                    .updateAttributes('image', { height: value })
                    .run();
                }}
              />
            </div>
          </>
        )}

        <Divider />
        {/* <ShowPopover
          showIfKey={state.currentShowIfKey}
          onShowIfKeyValueChange={(value) => {
            editor
              ?.chain()
              .updateAttributes(state.isLogoActive ? 'logo' : 'image', {
                showIfKey: value,
              })
              .run();
          }}
          editor={editor}
        /> */}
      </TooltipProvider>
    </BubbleMenu>
  );
}
