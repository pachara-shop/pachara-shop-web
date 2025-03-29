import { Command, Extension } from '@tiptap/core';
import { AllSelection, TextSelection, Transaction } from 'prosemirror-state';

export interface IndentOptions {
  types: string[];
  minLevel: number;
  maxLevel: number;
  indentLevel: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create<IndentOptions>({
  name: 'indent',
  addOptions() {
    return {
      types: ['listItem', 'paragraph', 'heading'],
      minLevel: 0,
      maxLevel: 8,
      indentLevel: 24,
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            renderHTML: (attributes) => ({
              style: `margin-left: ${attributes.indent * 24}px`,
            }),
            parseHTML: (element) => {
              const indent = element.style.marginLeft;
              return indent ? parseInt(indent, 10) / 24 : 0;
            },
          },
        },
      },
    ];
  },
  addCommands() {
    const setNodeIndentMarkup = (
      tr: Transaction,
      pos: number,
      delta: number
    ): Transaction => {
      const node = tr?.doc?.nodeAt(pos);

      if (node) {
        const nextLevel = (node.attrs.indent || 0) + delta;
        const { minLevel, maxLevel } = this.options;
        let indent;
        if (nextLevel < minLevel) {
          indent = minLevel;
        } else if (nextLevel > maxLevel) {
          indent = maxLevel;
        } else {
          indent = nextLevel;
        }

        if (indent !== node.attrs.indent) {
          const { indent: _oldIndent, ...currentAttrs } = node.attrs;
          const nodeAttrs =
            indent > minLevel ? { ...currentAttrs, indent } : currentAttrs;
          return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
        }
      }
      return tr;
    };

    const updateIndentLevel = (tr: Transaction, delta: number): Transaction => {
      const { doc, selection } = tr;

      if (
        doc &&
        selection &&
        (selection instanceof TextSelection ||
          selection instanceof AllSelection)
      ) {
        const { from, to } = selection;
        doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            tr = setNodeIndentMarkup(tr, pos, delta);
            return false;
          }

          return true;
        });
      }

      return tr;
    };
    const applyIndent: (direction: number) => () => Command =
      (direction) =>
      () =>
      ({ tr, state, dispatch }) => {
        const { selection } = state;
        tr = tr.setSelection(selection);
        tr = updateIndentLevel(tr, direction);

        if (tr.docChanged) {
          dispatch?.(tr);
          return true;
        }

        return false;
      };

    return {
      indent: applyIndent(1),
      outdent: applyIndent(-1),
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.outdent(),
      Backspace: ({ editor }) => {
        const { selection, doc } = editor.state;
        const { from } = selection;

        // Check if cursor is at start of line
        const isAtStart = from === doc.resolve(from).start();

        // Get current node and check indent level
        const node = doc.resolve(from).parent;
        const currentIndent = node.attrs.indent || 0;

        if (isAtStart && currentIndent > 0) {
          return editor.commands.outdent();
        }

        return false;
      },
    };
  },
});
