export const getHtml = (content: string): string => {
  const fullHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Exported Content</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.4.6/dist/base.min.css">
      <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.4.6/dist/components.min.css">
      <link rel="stylesheet" href="https://unpkg.com/@tailwindcss/typography@0.1.2/dist/typography.min.css">
      <link rel="stylesheet" href="https://unpkg.com/tailwindcss@1.4.6/dist/utilities.min.css">
      <script>
        tailwind.config = {
          theme: {
            extend: {},
          },
          plugins: [tailwindTypography],
        }
      </script>
      <style>
        /* Add any styles you want to include in the exported HTML */
        body {
          padding: 10px;
        }
        h1, h2, h3, h4, h5, h6 {
          font-size: revert !important;
          font-weight: revert !important;
        }
        .tiptap.ProseMirror {
          outline: none !important;
        }
        #rich-text-editor > div:first-child {
          background-color: hsl(210deg 40% 96.1% / 40%) !important;
        }
      </style>
    </head>
    <body>
      <div class="prose">
        ${content}
      </div>
    </body>
  </html>
  `;
  return fullHTML;
};