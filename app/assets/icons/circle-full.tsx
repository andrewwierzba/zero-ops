import { twMerge } from 'tailwind-merge';

type IconProps = { className?: string };

export function CircleFullIcon({ className }: IconProps) {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={twMerge('size-3 shrink-0', className)}>
            <path d="M6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0ZM6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5Z" fill="currentColor" />
            <circle cx="6" cy="6" r="3.25" fill="currentColor" />
        </svg>
    );
}
