
const LoadingWithLogo = () => {
    return (
        <div className="absolute flex items-center justify-center w-full h-full bg-white dark:bg-black">
            <svg fill="currentColor" className="text-black dark:text-white w-18 h-18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                </path>
            </svg>
        </div>
    )
};

export default LoadingWithLogo;