import { FC } from "react";

type IconlyIconProps = {
    size?: number;
    color?: string;
};

export const IconlyDelete: FC<IconlyIconProps> = ({
    size = 24,
    color = "currentColor",
}: IconlyIconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19.6666 10.3745L19.0547 18.7511C18.9282 20.4839 17.4854 21.8265 15.7468 21.8265H9.75378C8.01619 21.8265 6.57241 20.4839 6.44594 18.7502L5.83398 10.3745"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M21.0149 7.22998H4.48535"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M16.5214 7.22889L16.0184 4.75287C15.8725 4.20707 15.3773 3.82764 14.813 3.82764H10.6918C10.1246 3.8257 9.62745 4.20513 9.48054 4.75287L8.98242 7.22889"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M10.8516 12.6089V17.1173M14.232 12.6089V17.1173"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};
