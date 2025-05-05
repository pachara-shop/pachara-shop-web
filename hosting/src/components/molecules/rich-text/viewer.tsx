import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import UploadImage from 'tiptap-extension-upload-image';

interface ViewerProps {
  content: string;
  styling?: 'default' | 'prose';
}

const Viewer = ({ content, styling }: ViewerProps) => {
  const editor = useEditor({
    extensions: [StarterKit, UploadImage],
    content,
    editable: false,
  });

  if (!editor) return null;

  const className: string =
    styling === 'prose' ? 'prose-mt-0 prose max-w-none dark:prose-invert' : '';

  return (
    <article className={className}>
      <EditorContent editor={editor} readOnly />
    </article>
  );
};

export default Viewer;
