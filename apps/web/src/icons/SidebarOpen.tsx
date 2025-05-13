import { FC } from "react";

type IconlyIconProps = {
    size?: number;
    color?: string;
};

export const IconlySidebarOpen: FC<IconlyIconProps> = ({
    size = 24,
    color = "#000000",
}: IconlyIconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.51166 21C4.12452 21 3.00003 19.8812 3.00003 18.5011L3 5.49889C3 4.11879 4.1245 3 5.51163 3L6.48834 3C7.87548 3 8.99997 4.11879 8.99997 5.49889L9 18.5011C9 19.8812 7.8755 21 6.48837 21L5.51166 21Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M17.4995 8.5L21 11.9997L17.4995 15.5"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};
