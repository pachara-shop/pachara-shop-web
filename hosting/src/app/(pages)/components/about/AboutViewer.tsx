'use client';

import Viewer from '@/components/molecules/rich-text/viewer';

export default function AboutViewer({ content }: { content: string }) {
  return <Viewer content={content} />;
}
