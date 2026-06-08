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
    diff?: boolean;
    filename?: string;
    hideLineNumbers?: boolean;
    inset?: boolean;
    language?: string;
    removedLinesNumbers?: number[];
};

type DiffLineKind = 'added' | 'removed' | 'context';

function classifyDiffLine(line: string): DiffLineKind {
    if (line.startsWith('+++') || line.startsWith('---')) return 'context';
    if (line.startsWith('+')) return 'added';
    if (line.startsWith('-')) return 'removed';
    return 'context';
}

function stripDiffPrefix(line: string): string {
    if (line.startsWith('+++') || line.startsWith('---')) return line;
    if (line.startsWith('+') || line.startsWith('-') || line.startsWith(' ')) return line.slice(1);
    return line;
}

function parseDiff(code: string): { strippedCode: string; kinds: DiffLineKind[]; lineNumbers: (number | null)[] } {
    const rawLines = code.split(/\r\n|\r|\n/);
    const kinds = rawLines.map(classifyDiffLine);
    const strippedLines = rawLines.map(stripDiffPrefix);
    const lineNumbers: (number | null)[] = [];
    let newLineNo = 1;
    for (const kind of kinds) {
        if (kind === 'removed') {
            lineNumbers.push(null);
        } else {
            lineNumbers.push(newLineNo);
            newLineNo += 1;
        }
    }
    return { strippedCode: strippedLines.join('\n'), kinds, lineNumbers };
}

export function CodeBlock({
    addedLinesNumbers,
    children,
    className,
    diff,
    filename,
    hideLineNumbers,
    inset,
    language,
    removedLinesNumbers,
    ...props
}: CodeBlockProps) {
    const code = typeof children === 'string' ? children : null;

    let displayCode = code;
    let diffKinds: DiffLineKind[] | null = null;
    let diffLineNumbers: (number | null)[] | null = null;
    if (diff && code != null) {
        const parsed = parseDiff(code);
        displayCode = parsed.strippedCode;
        diffKinds = parsed.kinds;
        diffLineNumbers = parsed.lineNumbers;
    }

    const lineTokens = displayCode ? tokenize(displayCode, language) : null;

    return (
        <div
            aria-label="code-block"
            className={cn('bg-[rgb(247,247,247)] dark:bg-[rgb(31,39,45)] border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-200 flex flex-col text-[13px] overflow-hidden', className)}
            {...props}
        >
            {filename && (
                <div className="items-center bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex gap-2 p-4">
                    <FileCodeIcon className="text-neutral-500 size-4" />
                    <span>{filename}</span>
                </div>
            )}
            <pre className={cn('overflow-x-auto py-4', inset && 'px-4')}>
                <code>
                    {lineTokens?.map((tokens, index) => {
                        if (diff && diffKinds && diffLineNumbers) {
                            const kind = diffKinds[index];
                            return (
                                <CodeLine
                                    key={index}
                                    lineNumber={diffLineNumbers[index]}
                                    tokens={tokens}
                                    variant={kind === 'added' ? 'added' : kind === 'removed' ? 'removed' : undefined}
                                />
                            );
                        }
                        return (
                            <CodeLine
                                hideLineNumbers={hideLineNumbers}
                                key={index}
                                lineNumber={index + 1}
                                tokens={tokens}
                                variant={addedLinesNumbers?.includes(index + 1) ? 'added' : removedLinesNumbers?.includes(index + 1) ? 'removed' : undefined}
                            />
                        );
                    })}
                </code>
            </pre>
        </div>
    );
}

const codeLineVariants = cva(
    'items-center flex',
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
    'bg-inherit box-content text-neutral-500 dark:text-neutral-400 left-0 pl-4 pr-4 sticky shrink-0 tabular-nums text-right w-4',
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
        lineNumber?: number | null;
        tokens: PrismToken[];
    };

export function CodeLine({ className, hideLineNumbers, id, lineNumber, tokens, variant, ...props }: CodeLineProps) {
    const lineId = useId();
    const resolvedId = id ?? `${lineId}-l${lineNumber ?? 'blank'}`;

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
                    {lineNumber ?? ''}
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
