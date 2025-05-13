import { FC } from "react";

type IconlyIconProps = {
    size?: number;
    color?: string;
};

export const IconlyUser: FC<IconlyIconProps> = ({
    size = 24,
    color = "#000000",
}: IconlyIconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.93255 3H16.3673C19.3154 3 21.1504 5.08119 21.1504 8.02638V15.9736C21.1504 18.9188 19.3154 21 16.3663 21H7.93255C4.98444 21 3.15039 18.9188 3.15039 15.9736V8.02638C3.15039 5.08119 4.9932 3 7.93255 3Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M6.98926 20.9202V20.0153C6.98926 18.3321 8.32223 16.2305 12.146 16.2305C15.9795 16.2305 17.3125 18.3126 17.3125 19.9959V20.9202"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4454 10.5259C15.4454 12.3464 13.9704 13.8214 12.1499 13.8214C10.3295 13.8214 8.85352 12.3464 8.85352 10.5259C8.85352 8.7055 10.3295 7.23047 12.1499 7.23047C13.9704 7.23047 15.4454 8.7055 15.4454 10.5259Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};
