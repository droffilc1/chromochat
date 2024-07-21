'use client';

import clsx from 'clsx';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(`
                flex
                justify-center
                rounded-md
                py-2
                px-4
                text-sm
                font-semibold
                foucs-visible:outline
                foucs-visible:outline-2
                foucs-visible:outline-offset-2
            `,
            disabled && "opacity-50 cursor-default",
            fullWidth && "w-full",
            secondary ? "text-gray-700 bg-gray-200" : "text-white bg-secondColor",
            danger && "bg-red-600 hover:bg-red-700 focus-visible:outline-red-800",
            !secondary && !danger && "bg-secondColor hover:bg-firstColor focus-visible:outline-thirdColor",
            )}
        >
            {children}
        </button>
    );
};

export default Button;
