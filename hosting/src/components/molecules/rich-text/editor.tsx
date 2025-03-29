'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import EditorToolbar from './toolbar/editor-toolbar';
import { Indent } from './extensions/intent';
import { CustomLink } from './extensions/link';
import { useUploadImage } from './extensions/uploadImage';
import { cn } from '@/lib/utils';

interface EditorProps {
  content: string;
  placeholder?: string;
  onChange: (value: string) => void;
  isExport?: boolean;
  exportName?: string;
  className?: string;
}

const Editor = ({
  content,
  placeholder,
  onChange,
  isExport,
  exportName,
  className,
}: EditorProps) => {
  const UploadImage = useUploadImage();

  const editor = useEditor({
    extensions: [StarterKit, UploadImage, CustomLink, Indent],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor?.getText() === '') {
      editor?.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) return null;
  return (
    <div
      className='prose max-w-none w-full border border-input bg-background dark:prose-invert'
      id='rich-text-editor'
    >
      <EditorToolbar
        editor={editor}
        isExport={isExport}
        exportName={exportName}
      />
      <div className='editor px-4'>
        <EditorContent
          editor={editor}
          placeholder={placeholder}
          className={cn('focus-visible:outline-none', className)}
        />
      </div>
    </div>
  );
};

export default Editor;
