import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    useEffect(() => {
        /**
        1. useEffect để theo dõi prop show
        2. Khi modal mở (show = true):
            - Set document.body.style.overflow = 'hidden' để ngăn scroll
        3. Khi modal đóng (show = false):
            - Set document.body.style.overflow = 'unset' để cho phép scroll lại
        4. cleanup function trong useEffect để reset overflow về 'unset' khi component unmount
        */
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
            {/* Overlay */}

            <div className="relative w-full overflow-scroll h-full bg-white dark:bg-black sm:min-w-[600px] sm:min-h-[400px] sm:max-w-[80vw] sm:max-h-[90vh] sm:w-auto sm:h-auto sm:rounded-2xl sm:shadow-xl">
                <div className="sticky top-0 left-0 right-0 flex items-center justify-center z-50 px-4 py-3 bg-white opacity-[98%] dark:bg-black">
                    <div className="absolute left-2 cursor-pointer p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-[#0f14191a] dark:hover:bg-[#ffffff1a]" onClick={onClose}>
                        <IoClose className="w-[25px] sm:w-[22px] h-[25px] sm:h-[22px] dark:text-white" />
                    </div>
                    <div className="flex justify-center flex-1">
                        <svg className="w-8 h-8 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-label="X" role="img" >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;
