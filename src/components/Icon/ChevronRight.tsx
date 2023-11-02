import React from 'react';
import {IconsProps} from "./Icon.types.ts";

export const ChevronRight: React.FC<IconsProps> = ({ size = 20 }) => {
    const SIZE_DEFAULT: number = 10;
    return (
        <svg  width={size} height={size + SIZE_DEFAULT} viewBox="0 0 20 30" fill="none">
            <path
                d="M18.702 16.5933L5.95595 29.3393C5.07498 30.2202 3.65042 30.2202 2.77882 29.3393L0.660731 27.2212C-0.220244 26.3402 -0.220244 24.9156 0.660731 24.044L9.69541 15.0094L0.660731 5.9747C-0.220244 5.09372 -0.220244 3.66917 0.660731 2.79756L2.76945 0.660731C3.65042 -0.220244 5.07498 -0.220244 5.94658 0.660731L18.6926 13.4067C19.5829 14.2877 19.5829 15.7123 18.702 16.5933Z"
                fill={'#000000'}
            />
        </svg>

    )
}