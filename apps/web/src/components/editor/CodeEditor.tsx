import { lazy, Suspense } from 'react';
import type { CodeLanguage } from '@dsa-studio/shared';
import { Skeleton } from '@/components/ui/skeleton';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

const LANGUAGE_MAP: Record<CodeLanguage, string> = {
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
};

interface CodeEditorProps {
  language: CodeLanguage;
  value: string;
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
}

function EditorFallback({ height }: { height: string }) {
  return (
    <div
      className="overflow-hidden rounded-md border"
      style={{ height }}
      role="status"
      aria-label="Loading code editor"
    >
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
}

export function CodeEditor({
  language,
  value,
  onChange,
  height = '420px',
  readOnly = false,
}: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Suspense fallback={<EditorFallback height={height} />}>
        <MonacoEditor
          height={height}
          language={LANGUAGE_MAP[language]}
          value={value}
          onChange={(v) => onChange(v ?? '')}
          theme="vs-dark"
          loading={<EditorFallback height={height} />}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            readOnly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            ariaLabel: `${LANGUAGE_MAP[language]} code editor`,
          }}
        />
      </Suspense>
    </div>
  );
}
