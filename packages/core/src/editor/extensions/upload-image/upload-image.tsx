import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { ImageIcon, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';

export function UploadImageNode(props: NodeViewProps) {
	const [error, setError] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const handleUpload = useCallback(
		async (file: File) => {
			try {
				setIsUploading(true);
				setError(false);

				const uploadImage = props.extension.options.uploadImage;
				if (!uploadImage) {
					throw new Error('Upload image function not configured');
				}

				const imageUrl = await uploadImage(file);

				// Replace this node with a regular image node
				props.editor
					.chain()
					.deleteNode(props.node.attrs.id)
					.insertContent({
						type: 'image',
						attrs: {
							src: imageUrl,
							alt: file.name,
						},
					})
					.run();
			} catch (err) {
				setError(true);
				console.error('Failed to upload image:', err);
			} finally {
				setIsUploading(false);
			}
		},
		[props.editor, props.extension.options]
	);

	const handleFileSelect = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				handleUpload(file);
			}
		},
		[handleUpload]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);

			const file = e.dataTransfer.files?.[0];
			if (file?.type.startsWith('image/')) {
				handleUpload(file);
			}
		},
		[handleUpload]
	);

	if (error) {
		return (
			<NodeViewWrapper>
				<div className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed border-border bg-secondary">
					<div className="flex flex-col items-center gap-2 text-muted-foreground">
						<ImageIcon className="h-8 w-8 text-muted-foreground" />
						<p className="text-sm font-medium text-foreground">Failed to upload image</p>
					</div>
				</div>
			</NodeViewWrapper>
		);
	}

	if (isUploading) {
		return (
			<NodeViewWrapper>
				<div className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed border-border bg-secondary">
					<div className="flex flex-col items-center gap-2 text-muted-foreground">
						<Loader2 className="h-6 w-6 animate-spin" />
						<span className="text-sm">Uploading image...</span>
					</div>
				</div>
			</NodeViewWrapper>
		);
	}

	return (
		<NodeViewWrapper>
			<div
				className={`flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors ${
					isDragging ? 'border-primary bg-primary/5' : 'border-border bg-secondary hover:bg-secondary/80'
				}`}
				onDrop={handleDrop}
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragging(true);
				}}
				onDragLeave={(e) => {
					e.preventDefault();
					setIsDragging(false);
				}}
			>
				<label className="flex cursor-pointer flex-col items-center gap-2 p-6">
					<ImageIcon className="h-8 w-8 text-muted-foreground" />
					<div className="flex flex-col items-center gap-1 text-center">
						<span className="text-sm font-medium text-foreground">
							Drop an image here, or click to select
						</span>
						<span className="mt-1 text-xs text-muted-foreground">PNG, JPG, GIF up to 25MB</span>
					</div>
					<input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
				</label>
			</div>
		</NodeViewWrapper>
	);
}
