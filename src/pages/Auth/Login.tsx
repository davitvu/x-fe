

const Login = () => {
    return (
        <div className="flex flex-col w-screen min-h-screen bg-white p-9 md:p-0 dark:bg-black">
            <div className="flex flex-col flex-grow h-full md:flex-row md:items-center md:justify-center">
                <div className="md:flex md:items-center md:justify-center sm:w-1/2 md:w-[56%] lg:w-[58%] md:p-7">
                    <svg fill="currentColor" className="text-black dark:text-white w-[45px] h-[45px] md:max-w-[350px] md:max-h-[350px] md:min-h-[300px] md:min-w-[300px] lg:min-h-[370px] lg:min-w-[370px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                </div>
                <div className="md:w-[44%] sm:w-1/2 md:p-5 lg:w-[42%] text-black dark:text-white">
                    <div className="mb-5 md:mb-8">
                        <h1 className="my-[38px] md:my-[50px] text-[40px] leading-[52px] tracking-[1.8px] text-[0F1419] font-black md:text-6xl">Happening now</h1>
                        <span className="mb-5 text-[23px] leading-7 font-black tracking-[1.8px] text-[rgb(15, 20, 25)] md:text-3xl">Join today.</span>
                    </div>
                    {/* <div className="w-full md:w-[300px] h-[38px] flex items-center justify-center cursor-pointer border-[1px] hover:border-[#d5e3fa] transition-all duration-300 ease-in-out hover:bg-[#f1f6fe] border-[#dbdce0] rounded-[20px] mb-4 dark:bg-white dark:text-black ">
                        <svg className="w-[18px] h-[18px] mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <g>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </g>
                        </svg>
                        <span className="text-md md:text-[15px] font-medium text-[rgb(60, 64, 67)]">Sign up with Google</span>
                    </div> */}
                    <div className="w-full md:w-[300px] px-2 h-[38px] flex items-center justify-between cursor-pointer border-[1px] hover:border-[#d5e3fa] transition-all duration-300 ease-in-out hover:bg-[#f1f6fe] border-[#dbdce0] rounded-[20px] mb-4 dark:bg-white dark:text-black ">
                        <div className="flex items-center">
                            <div className="bg-[#759d48] w-5 h-5 text-white flex items-center justify-center rounded-full text-[10px] text-center mr-2">X</div>
                            <div className="">
                                <p className="text-[12px] font-medium leading-[14px] text-ellipsis ">Sign in as Xuan Truong</p>
                                <p className="text-[11px] leading-3 text-[#5F6368]">xuantruongvu319@gmail.com</p>
                            </div>
                        </div>
                        <svg className="w-[18px] h-[18px]" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <g>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="w-full md:w-[300px] h-[38px] flex items-center justify-center cursor-pointer border-[1px] transition-all duration-300 ease-in-out hover:bg-[#e6e6e6] border-[#d1d9de] rounded-[20px] dark:bg-white dark:text-black ">
                        <svg className="w-[20px] h-[20px] mr-2" viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                            </g>
                        </svg>
                        <span className="text-md md:text-[15px] font-medium">Sign up with Apple</span>
                    </div>
                    <div className="w-full md:w-[300px] max-h-5 flex items-center justify-center my-2">
                        <div className="flex-grow bg-[#9bacbb] dark:bg-[#434548] h-[1px]"></div>
                        <p className="inline-block px-2 text-sm text-[#676b6f] bg-white dark:bg-black">OR</p>
                        <div className="flex-grow bg-[#9bacbb] dark:bg-[#434548] h-px"></div>
                    </div>
                    <a href="#" className="w-full md:w-[300px] h-[38px] flex items-center justify-center bg-[#479bea] hover:bg-[#408cd2] transition-all duration-300 ease-in-out rounded-[20px] mb-4">
                        <span className="text-white text-md md:text-[15px] font-semibold">Create account</span>
                    </a>
                    <div className="w-full md:w-[300px] text-[10px] mb-10 dark:text-[#71767B]">
                        <p>By signing up, you agree to the <a href="#" className="text-[#1D9BF0] hover:underline">Terms of Service</a> and <a href="#" className="text-[#1D9BF0] hover:underline">Privacy Policy</a>, including <a href="#" className="text-[#1D9BF0] hover:underline">Cookie Use.</a></p>
                    </div>
                    <p className="mb-4 font-semibold">Already have an account?</p>
                    <a href="#" className="mb-6 w-full md:w-[300px] h-[38px] flex items-center justify-center border-[1px] transition-all duration-300 ease-in-out border-[#d1d9de] dark:border-[#566470] bg-white dark:bg-white hover:bg-[#ecf5fd] dark:hover:bg-[#d8dbdc] rounded-[20px]">
                        <span className="text-[#479bea] text-md md:text-[15px] font-semibold">Sign in</span>
                    </a>
                    <div className="w-full mb-9 md:w-[300px] h-[38px] flex items-center justify-center cursor-pointer border-[1px] transition-all duration-300 ease-in-out hover:bg-[#e6e6e6] border-[#d1d9de] rounded-[20px] dark:border-[#566470] dark:bg-black dark:hover:bg-[#181919] dark:text-white ">
                        <svg className="w-[20px] h-[20px] mr-2" viewBox="0 0 33 32" aria-hidden="true">
                            <g>
                                <path fill="currentColor" d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
                            </g>
                        </svg>
                        <span className="text-md md:text-[15px] font-medium">Get Grok</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center mb-3 md:mx-4 gap-y-1 text-xs text-[#536471] dark:text-[#71757B]">
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">About</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Download the X app</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Grok</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Help Center</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Terms of Service</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Cookie Policy</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Accessibility</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Ads info</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Blog</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Careers</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Brand Resources</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Advertising</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Marketing</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">X for Business</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Developers</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Directory</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">Settings</a>
                    <span className="pl-2">|</span>
                </div>
                <div className="my-1 mr-2">
                    <a href="#" className="hover:underline">© 2025 X Corp.</a>
                </div>
            </div>
        </div>
    )
}

export default Login;