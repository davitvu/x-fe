import { type ButtonHTMLAttributes, type FC } from 'react';

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isFormValid: boolean;
}

export const ButtonSubmit: FC<ButtonSubmitProps> = ({
    onClick,
    disabled,
    className = '',
    isFormValid,
    children,
    ...props
}) => {

    // const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    //     // Kiểm tra nếu button không bị disabled và form valid
    //     if (isFormValid && !disabled && e.key === "Enter") {
    //         console.log("Submit triggered by Enter");
    //         onClick?.(e as any);
    //     }
    // }

    // const isDisabled = disabled || !isFormValid;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            // onKeyDown={handleKeyDown}
            {...props}
            className={`w-full h-[34px] sm:h-[50px] flex items-center justify-center dark:bg-[#eef1f2] 
                ${isFormValid ? 'bg-black hover:bg-[#408cd2] cursor-pointer' : 'bg-[#8B98A5] cursor-not-allowed'}
                transition-all duration-300 ease-in-out rounded-[20px] ${className}`}
        >
            <span className="text-sm font-semibold text-white sm:text-base dark:text-black">
                {children || 'Next'}
            </span>
        </button>
    )
}