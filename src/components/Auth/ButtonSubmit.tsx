import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isFormValid: boolean;
    className?: string;
}

export const ButtonSubmit = ({ onClick, disabled, className = '', isFormValid, ...passProps }: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            {...passProps}
            className={`w-full h-[34px] sm:h-[50px] flex items-center justify-center dark:bg-[#eef1f2] 
                    ${isFormValid ? 'bg-black hover:bg-[#408cd2] cursor-pointer' : 'bg-[#8B98A5] cursor-not-allowed'}
                    transition-all duration-300 ease-in-out rounded-[20px] ${className}`}>
            <span className="text-sm font-semibold text-white sm:text-base dark:text-black">Next</span>
        </button>
    )
}