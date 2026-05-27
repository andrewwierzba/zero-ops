import { twMerge } from 'tailwind-merge';

type IconProps = { className?: string };

export function CircleTwoFourthIcon({ className }: IconProps) {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={twMerge('size-3 shrink-0', className)}>
            <path d="M6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0ZM6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5Z" fill="currentColor" />
            <path opacity="0.25" d="M5.5 9.21191C3.94244 8.97142 2.75 7.6249 2.75 6C2.75 4.37505 3.94237 3.02754 5.5 2.78711V9.21191Z" fill="currentColor" />
            <path d="M6.5 2.78711C8.05763 3.02754 9.25 4.37505 9.25 6C9.25 7.6249 8.05756 8.97142 6.5 9.21191V2.78711Z" fill="currentColor" />
        </svg>
    );
}
