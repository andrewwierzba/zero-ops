'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { FileCodeIcon } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import { useId } from 'react';

import { cn } from '@/lib/utils';

type PrismToken = { types: string[]; content: string };

function flattenTokens(tokens: (string | Prism.Token)[], parentTypes: string[] = []): PrismToken[] {
    return tokens.flatMap((token) => {
        if (typeof token === 'string') {
            return [{ types: parentTypes, content: token }];
        }
        const types = [...parentTypes, token.type, ...(Array.isArray(token.alias) ? token.alias : token.alias ? [token.alias] : [])];
        const content = Array.isArray(token.content) ? token.content : [token.content];
        return flattenTokens(content as (string | Prism.Token)[], types);
    });
}

function tokenize(code: string, language?: string): PrismToken[][] {
    const grammar = language && Prism.languages[language];
    const tokens = grammar ? Prism.tokenize(code, grammar) : null;
    const lines = code.split(/\r\n|\r|\n/);

    if (!tokens) {
        return lines.map((line) => [{ types: [], content: line }]);
    }

    const flat = flattenTokens(tokens);
    const lineTokens: PrismToken[][] = [[]];

    for (const token of flat) {
        const parts = token.content.split(/(\n)/);
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === '\n') {
                lineTokens.push([]);
            } else {
                lineTokens[lineTokens.length - 1].push({ types: token.types, content: parts[i] });
            }
        }
    }

    return lineTokens;
}

type CodeBlockProps = React.HTMLAttributes<HTMLDivElement> & {
    addedLinesNumbers?: number[];
    children: React.ReactNode;
    filename?: string;
    hideLineNumbers?: boolean;
    language?: string;
    removedLinesNumbers?: number[];
};

export function CodeBlock({
    addedLinesNumbers,
    children,
    className,
    filename,
    hideLineNumbers,
    language,
    removedLinesNumbers,
    ...props
}: CodeBlockProps) {
    const code = typeof children === 'string' ? children : null;
    const lineTokens = code ? tokenize(code, language) : null;

    return (
        <div
            aria-label="code-block"
            className={cn('bg-muted border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-200 flex flex-col text-sm overflow-hidden', className)}
            {...props}
        >
            {filename && (
                <div className="items-center bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex gap-2 p-4">
                    <FileCodeIcon className="text-neutral-500 size-4" />
                    <span>{filename}</span>
                </div>
            )}
            <pre className="py-4 overflow-x-auto">
                <code>
                    {lineTokens?.map((tokens, index) => (
                        <CodeLine
                            hideLineNumbers={hideLineNumbers}
                            key={index}
                            lineNumber={index + 1}
                            tokens={tokens}
                            variant={addedLinesNumbers?.includes(index + 1) ? 'added' : removedLinesNumbers?.includes(index + 1) ? 'removed' : undefined}
                        />
                    ))}
                </code>
            </pre>
        </div>
    );
}

const codeLineVariants = cva(
    'items-center bg-muted flex',
    {
        variants: {
            variant: {
                added: 'bg-green-50 dark:bg-green-950',
                removed: 'bg-red-50 dark:bg-red-950',
            },
        },
    }
);

const codeLineNumberVariants = cva(
    'sticky left-0 bg-inherit box-content text-neutral-500 dark:text-neutral-400 tabular-nums pl-4 pr-4 shrink-0 text-right w-4',
    {
        variants: {
            variant: {
                added: 'shadow-[inset_2px_0_0_0] shadow-green-600',
                removed: 'shadow-[inset_2px_0_0_0] shadow-red-600',
            },
        },
    }
);

type CodeLineProps = React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof codeLineVariants> & {
        hideLineNumbers?: boolean;
        lineNumber?: number;
        tokens: PrismToken[];
    };

export function CodeLine({ className, hideLineNumbers, id, lineNumber, tokens, variant, ...props }: CodeLineProps) {
    const lineId = useId();
    const resolvedId = id ?? `${lineId}-l${lineNumber}`;

    return (
        <div
            aria-label="line"
            className={cn(codeLineVariants({ variant }), className)}
            id={resolvedId}
            {...props}
        >
            {!hideLineNumbers && (
                <button
                    aria-hidden="true"
                    className={codeLineNumberVariants({ variant })}
                    tabIndex={-1}
                    type="button"
                >
                    {lineNumber}
                </button>
            )}
            <div>
                {tokens.map((token, i) =>
                    token.types.length > 0
                        ? <span className={`token ${token.types.join(' ')}`} key={i}>{token.content}</span>
                        : <span key={i}>{token.content}</span>
                )}
            </div>
        </div>
    );
}
