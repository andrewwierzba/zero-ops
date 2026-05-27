import { twMerge } from 'tailwind-merge';

type IconProps = { className?: string };

export function CircleOneFourthIcon({ className }: IconProps) {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={twMerge('size-3 shrink-0 animate-spin', className)}>
            <path d="M6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0ZM6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5Z" fill="currentColor" />
            <path opacity="0.25" d="M5.5 6.5H9.21191C8.97142 8.05756 7.6249 9.25 6 9.25C4.20507 9.25 2.75 7.79493 2.75 6C2.75 4.37505 3.94237 3.02754 5.5 2.78711V6.5Z" fill="currentColor" />
            <path d="M6.5 2.78711C7.89465 3.00238 8.99658 4.10537 9.21191 5.5H6.5V2.78711Z" fill="currentColor" />
        </svg>
    );
}
