import React, { useCallback } from 'react';
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Image,
  Indent,
  Outdent,
} from 'lucide-react';

// import { ToggleGroup } from '@/components/atoms/ToggleGroup';
// import { Toggle } from '@/components/atoms/Toggle';
// import { Toolbar } from '@/components/ui/toolbar';
import { Editor } from '@tiptap/react';
import { Icon } from '@/components/atoms/Icon';
import { FormatType } from './format-type';
import { getHtml } from './html';

interface EditorToolbarProps {
  editor: Editor;
  isExport?: boolean;
  exportName?: string;
}

const EditorToolbar = ({
  editor,
  isExport,
  exportName,
}: EditorToolbarProps) => {
  const exportToHTML = () => {
    if (editor && isExport) {
      const content = editor.getHTML();
      const fullHTML = getHtml(content);
      const blob = new Blob([fullHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exportName ?? 'index'}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    let url = window.prompt('URL', previousUrl);
    if (url === null) {
      return;
    }
    if (url && !/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } catch (e) {
      console.error((e as Error).message);
    }
  }, [editor]);

  return (
    <Toolbar aria-label='Formatting options' className=''>
      <ToggleGroup
        className='flex flex-wrap items-start justify-start'
        type='multiple'
      >
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive('bold')}
        >
          <Bold className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive('italic')}
          value='italic'
        >
          <Italic className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive('strike')}
        >
          <Strikethrough className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.commands.indent()}
          pressed={editor.isActive('indent')}
        >
          <Indent className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.commands.outdent()}
          pressed={editor.isActive('indent')}
        >
          <Outdent className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          pressed={editor.isActive('bulletList')}
        >
          <List className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          pressed={editor.isActive('orderedList')}
        >
          <ListOrdered className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          pressed={editor.isActive('codeBlock')}
        >
          <Code className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          onPressedChange={setLink}
          className={`mr-1 ${editor.isActive('link') ? 'is-active' : ''}`}
          disabled={editor.isActive('link')}
        >
          <Icon icon='icon-[lucide--link-2]' className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => {
            editor.chain().focus().unsetLink().run();
          }}
          disabled={!editor.isActive('link')}
        >
          <Icon icon='icon-[lucide--link-2-off]' className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          pressed={editor.isActive('blockquote')}
        >
          <Quote className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
        >
          <Minus className='h-4 w-4' />
        </Toggle>
        <FormatType editor={editor} />
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().addImage().run()}
          disabled={!editor.can().chain().focus().setImage({ src: '' }).run()}
          pressed={editor.isActive('image')}
        >
          <Image className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className='h-4 w-4' />
        </Toggle>

        <Toggle
          size='sm'
          className='mr-1'
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className='h-4 w-4' />
        </Toggle>
        {isExport && (
          <Toggle size='sm' className='mr-1'>
            <button type='button' onClick={exportToHTML}>
              Export
            </button>
          </Toggle>
        )}
      </ToggleGroup>
    </Toolbar>
  );
};

export default EditorToolbar;
