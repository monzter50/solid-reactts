import React from 'react';
import {IconsProps} from "./Icon.types.ts";

export const ChevronLeft: React.FC<IconsProps> = ({  size = 20 }) => {
    const SIZE_DEFAULT: number = 10;

    return (
        <svg  width={size} height={size + SIZE_DEFAULT} viewBox="0 0 20 30" fill="none">
            <path
                d="M0.669243 13.4067L13.6023 0.660731C14.4962 -0.220244 15.9417 -0.220244 16.8261 0.660731L18.9752 2.77882C19.8691 3.65979 19.8691 5.08435 18.9752 5.95595L9.81748 15L18.9847 24.0347C19.8786 24.9156 19.8786 26.3402 18.9847 27.2118L16.8356 29.3393C15.9417 30.2202 14.4962 30.2202 13.6118 29.3393L0.678753 16.5933C-0.22466 15.7123 -0.22466 14.2877 0.669243 13.4067Z"
                fill={'#000000'}
            />
        </svg>

    )
}