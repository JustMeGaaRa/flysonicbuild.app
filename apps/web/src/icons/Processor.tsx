import { FC } from "react";

type IconlyIconProps = {
    size?: number;
    color?: string;
};

export const IconlyCpuProcessor: FC<IconlyIconProps> = ({
    size = 24,
    color = "#000000",
}: IconlyIconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox={"0 0 24 24"}
            fill={"none"}
            xmlns={"http://www.w3.org/2000/svg"}
        >
            <path
                d="M8.49128 4.53711H15.5133C17.9564 4.53711 19.4694 5.86328 19.4626 8.29961V15.6952C19.4626 18.1315 17.9486 19.4645 15.5055 19.4645H8.49128C6.05592 19.4645 4.53516 18.1082 4.53516 15.6329V8.29961C4.53516 5.86328 6.05592 4.53711 8.49128 4.53711Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M16.0485 4.5373V3M11.9989 4.5373V3M7.94922 4.5373V3"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M7.94922 19.4629V21.0002M11.9989 19.4629V21.0002M16.0485 19.4629V21.0002"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M4.5373 7.94922H3M4.5373 11.9989H3M4.5373 16.0485H3"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M19.4629 16.0485H21.0002M19.4629 11.9989H21.0002M19.4629 7.94922H21.0002"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.6741 8.44531H10.329C9.16823 8.44531 8.44336 9.07677 8.44336 10.2375V13.7325C8.44336 14.9117 9.16823 15.5578 10.329 15.5578H13.6702C14.8348 15.5578 15.5558 14.9224 15.5558 13.7617V10.2375C15.5597 9.07677 14.8378 8.44531 13.6741 8.44531Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};
