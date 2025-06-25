
// interface InputTextProps {
//     label: string;
//     value: string;
//     errorMessage?: string;
//     onBlur?: () => void;

// }

// export const InputText = ({ }: InputTextProps) => {


//     return (
//         <>
//             {/* Phone, email, or username */}
//             <div className={`group relative mb-5 border rounded-sm h-[58px] w-full transition-all duration-200 ease-in-out 
//                         ${errors.username
//                     ? 'border-[#f4212e] dark:border-[#f4212e]'
//                     : 'border-light-blueish-gray dark:border-[#333639] has-[:focus]:border-X-blue has-[:focus]:shadow-[0px_0px_0px_1px_rgb(29,155,240)]'}`}
//                 onClick={() => document.getElementById('username')?.focus()}
//             >
//                 <input id="username"
//                     value={username}
//                     onChange={handleUsernameChange}
//                     onBlur={validateUsername}
//                     className={`h-[19px] dark:text-white pr-5 absolute bottom-2 left-2 right-2 w-[100%-8px] outline-none transition-all duration-200 ease-in-out peer`}
//                     type="text" />
//                 <label htmlFor="username"
//                     className={`cursor-auto absolute peer-focus:top-4 peer-focus:text-sm top-1/2 left-2 -translate-y-1/2 transition-all duration-200 ease-in-out peer-focus:text-X-blue leading-[23px] text-base
//                                 ${username ? 'top-4 text-sm' : 'top-1/2 -translate-y-1/2'}
//                                 ${document.activeElement?.id === 'username' ? 'text-X-blue' : ''}
//                                 ${errors.username && !username ? "!text-[#f4212e] dark:text-[#f4212e]" : "dark:text-[#71767b] text-dark-blueish-gray"}`}
//                 >Phone, email, or username</label>
//                 <div className={`absolute bottom-2 right-2 ${spinLoading ? "block animate-spin" : "hidden"}`}>
//                     <TbFidgetSpinner />
//                 </div>
//             </div>
//             {/* Phone, email, or username */}
//         </>
//     )
// }