import toast from "react-hot-toast"

const FABContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div onClick={() => toast("tứn lăng đeng phác trỉn", { icon: "🫣" })} className="fixed cursor-pointer active:hover:bg-medium-dark-blue flex items-center justify-center text-white w-[56px] h-[56px] bg-X-blue animate-fab-fade-in-up rounded-full right-5  bottom-[73px] shadow-2xl">
            {children}
        </div>
    )
}

export const FABNewTweet = () => {
    return (
        <FABContainer>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
            </svg>
        </FABContainer>
    )
}

export const FABNewMessage = () => {
    return (
        <FABContainer>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2v-1.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H13v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19 18v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"></path>
            </svg>
        </FABContainer>
    )
}