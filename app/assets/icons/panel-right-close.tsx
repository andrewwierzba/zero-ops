import { twMerge } from 'tailwind-merge';

type IconProps = { className?: string };

export function PanelRightCloseIcon({ className }: IconProps) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={twMerge('size-4 shrink-0', className)} xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_panel_right_close)">
                <path fillRule="evenodd" clipRule="evenodd" d="M13 15C14.6569 15 16 13.6568 16 12V4L15.9961 3.8457C15.9158 2.2606 14.6051 1 13 1L3 1L2.8457 1.0039C1.31166 1.0816 0.0816253 2.3117 0.00390625 3.8457L0 4L0 12C1.28853e-07 13.6568 1.34315 15 3 15L13 15ZM3 13.5C2.17157 13.5 1.5 12.8284 1.5 12L1.5 4C1.5 3.1716 2.17157 2.5 3 2.5L13 2.5C13.8284 2.5 14.5 3.1716 14.5 4L14.5 12C14.5 12.8284 13.8284 13.5 13 13.5L3 13.5Z" fill="currentColor" />

                {/* On hover: group slides left, line exits left, arrow enters from right */}
                <g className="transition-transform duration-400 ease-out group-hover:translate-x-[-14.5px]">
                    {/* Arrow pre-offset right so it starts off-screen; slides to natural position on hover */}
                    <path
                        className="translate-x-[14.5px]"
                        d="M8.34033 9.96961L7.12066 8.74994H11.31V7.24994H7.12066L8.34033 6.03026L7.27967 4.9696L4.7797 7.46961L4.2493 7.99994L4.7797 8.53027L7.27967 11.0303L8.34033 9.96961Z"
                        fill="currentColor"
                    />
                    {/* Mirrored: x = 16 - 3 - 1.5 = 11.5 */}
                    <rect
                        fill="currentColor"
                        height="8"
                        rx="0.75"
                        width="1.5"
                        x="11.5"
                        y="4"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_panel_right_close">
                    <rect width="16" height="16" fill="white" transform="matrix(1 0 0 -1 0 16)" />
                </clipPath>
            </defs>
        </svg>
    );
}
