import { useState, useEffect } from "react";
import { useModal } from "../../../contexts/ModalContext";
import SignUp from "./SignUp";
import Forgot from "./Forgot";
import { ButtonSubmit } from "../../../components/Auth/ButtonSubmit";
import { fetchMe, findUsername, login } from "../../../services/auth.service";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useCurrentAuthenticated } from "../../../contexts/Authenticate.context";
import { useDebouncedCallback } from 'use-debounce';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { openModal, closeModal } = useModal();
    const { setIsAuthenticated, refetchUser } = useCurrentAuthenticated();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: false,
        password: false
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        const isValid = username.trim() !== '' && password.length >= 6;
        setIsFormValid(isValid);
    }, [username, password]);

    const debouncedCheckUsername = useDebouncedCallback(async (value: string) => {
        if (!value.trim()) {
            setIsUsernameValid(false);
            setSpinLoading(false);
            return;
        }

        try {
            setSpinLoading(true);
            const result = await HandlerQueryUsername(value);
            if (result) {
                setIsUsernameValid(true);
                setErrors(prev => ({ ...prev, username: false }));
            } else {
                setIsUsernameValid(false);
                setErrors(prev => ({ ...prev, username: true }));
            }
        } catch (error) {
            setIsUsernameValid(false);
            toast.error('Error checking username');
        } finally {
            setSpinLoading(false);
        }
    }, 700);

    const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        setErrors(prev => ({ ...prev, username: false }));

        debouncedCheckUsername(value);
    };

    useEffect(() => {
        return () => {
            debouncedCheckUsername.cancel();
        };
    }, []);

    const HandlerQueryUsername = async (username: string) => {
        const res = await findUsername(username);
        if (!res?.data?.success) {
            toast.error(res.data.message);
        }
        return res?.data?.success || false;
    }

    const validateUsername = () => {
        if (username.trim() === '') {
            setErrors(prev => ({ ...prev, username: true }));
            return false;
        }
        return isUsernameValid;
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setErrors(prev => ({ ...prev, password: true }));
            return false;
        }
        return true;
    };

    const validateForm = () => {
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        return isUsernameValid && isPasswordValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        setLoading(true);
                        const res = await login(username, password);

                        if (res && res.data && res.data.success && res.data.data) {
                            localStorage.setItem('accessToken', res.data.data.accessToken);
                            resolve(res.data.message);
                            await refetchUser();
                            closeModal();
                            setIsAuthenticated(true);
                        } else if (res.data && !res.data.success) {
                            reject(res.data.message);
                        } else {
                            reject('Login failed');
                        }
                    } catch (error: any) {
                        reject(error.data.message || 'Login failed');
                    } finally {
                        setLoading(false);
                    }
                }),
                {
                    loading: 'Đang đăng nhập...',
                    success: <b>Đăng nhập thành công!</b>,
                    error: (error) => <b>{error as string}</b>,
                }
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen px-12 bg-white sm:p-0 sm:h-auto dark:bg-black sm:max-w-[364px] sm:mx-auto sm:px-8">
            <h1 className="self-start mb-6 text-2xl font-bold text-black sm:my-6 sm:text-3xl dark:text-white">Sign in to X</h1>

            {/* Google login button */}
            <div
                onClick={() => toast('Tính năng đang phát triển ăn em thum cãm!', {
                    icon: '🚀',
                })}
                className="w-full md:w-[300px] h-[38px] flex items-center justify-center cursor-pointer border-[1px] hover:border-[#d5e3fa] transition-all duration-300 ease-in-out hover:bg-[#f1f6fe] border-[#dbdce0] rounded-[20px] mb-4 dark:bg-white dark:text-black ">
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
            </div>
            {/* <div
                onClick={() => alert("tính năng chưa dùng được ăn em thong cãm")}
                className="w-full md:w-[300px] px-2 h-[38px] sm:h-[40px] flex items-center justify-between cursor-pointer border-[1px] hover:border-[#d5e3fa] transition-all duration-300 ease-in-out hover:bg-[#f1f6fe] border-[#dbdce0] rounded-[20px] mb-5 dark:bg-white dark:text-black "
            >
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
            </div> */}
            {/* Google login button */}

            {/* Apple login button */}
            <div
                onClick={() => toast('Tính năng đang phát triển ăn em thum cãm!', {
                    icon: '🚀',
                })}
                className="w-full md:w-[300px] mb-3 h-[38px] sm:h-[40px] flex items-center justify-center cursor-pointer border-[1px] transition-all duration-300 ease-in-out hover:bg-[#e6e6e6] border-[#d1d9de] rounded-[20px] dark:bg-white dark:text-black "
            >
                <svg className="w-[20px] h-[20px] mr-2" viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                        <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                    </g>
                </svg>
                <span className="text-sm md:text-[15px]">Sign up with Apple</span>
            </div>
            {/* Apple login button */}

            {/* OR */}
            <div className="w-full md:w-[300px] max-h-5 flex items-center justify-center mb-3">
                <div className="flex-grow bg-[#9bacbb] dark:bg-[#434548] h-[1px]"></div>
                <p className="inline-block px-2 text-[18px] dark:text-white text-[#676b6f] bg-white dark:bg-black -translate-y-[2px]">or</p>
                <div className="flex-grow bg-[#9bacbb] dark:bg-[#434548] h-px"></div>
            </div>
            {/* OR */}

            {/* Phone, email, or username */}
            <div className={`group relative mb-5 border rounded-sm h-[58px] w-full transition-all duration-200 ease-in-out 
                ${errors.username
                    ? 'border-[#f4212e] dark:border-[#f4212e]'
                    : 'border-[#cfd9de] dark:border-[#333639] has-[:focus]:border-[#1d9bf0] has-[:focus]:shadow-[0px_0px_0px_1px_rgb(29,155,240)]'}`}
                onClick={() => document.getElementById('username')?.focus()}
            >
                <input id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    onBlur={validateUsername}
                    className={`h-[19px] dark:text-white pr-5 absolute bottom-2 left-2 right-2 w-[100%-8px] outline-none transition-all duration-200 ease-in-out peer`}
                    type="text" />
                <label htmlFor="username"
                    className={`cursor-auto absolute peer-focus:top-4 peer-focus:text-sm top-1/2 left-2 -translate-y-1/2 transition-all duration-200 ease-in-out peer-focus:text-[#1d9bf0] leading-[23px] text-base
                        ${username ? 'top-4 text-sm' : 'top-1/2 -translate-y-1/2'}
                        ${document.activeElement?.id === 'username' ? 'text-[#1d9bf0]' : ''}
                        ${errors.username && !username ? "!text-[#f4212e] dark:text-[#f4212e]" : "dark:text-[#71767b] text-[#536471]"}`}
                >Phone, email, or username</label>
                <div className={`absolute bottom-2 right-2 ${spinLoading ? "block animate-spin" : "hidden"}`}>
                    <TbFidgetSpinner />
                </div>
            </div>
            {/* Phone, email, or username */}

            {/* Password */}
            {isUsernameValid ?
                <div className={`group relative mb-5 border rounded-sm h-[58px] w-full transition-all duration-200 ease-in-out 
                ${errors.password
                        ? 'border-[#f4212e] dark:border-[#f4212e]'
                        : 'border-[#cfd9de] dark:border-[#333639] has-[:focus]:border-[#1d9bf0] has-[:focus]:shadow-[0px_0px_0px_1px_rgb(29,155,240)]'}`}
                    onClick={() => document.getElementById('password')?.focus()}
                >
                    <input id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors(prev => ({ ...prev, password: false }));
                        }}
                        onBlur={validatePassword}
                        className="h-[19px] absolute dark:text-white bottom-2 left-2 right-2 w-[100%-8px] outline-none transition-all duration-200 ease-in-out peer"
                        type={isPasswordVisible ? "password" : "text"} />
                    <label htmlFor="password"
                        className={`cursor-auto absolute peer-focus:top-4 peer-focus:text-sm top-1/2 left-2 -translate-y-1/2 transition-all duration-200 ease-in-out peer-focus:text-[#1d9bf0] leading-[23px] text-base
                        ${password ? 'top-4 text-sm' : 'top-1/2 -translate-y-1/2'}
                        ${document.activeElement?.id === 'password' ? 'text-[#1d9bf0]' : ''}
                        ${errors.password && !password ? "!text-[#f4212e] dark:text-[#f4212e]" : "dark:text-[#71767b] text-[#536471]"}`}
                    >Password</label>
                    <div onClick={togglePasswordVisibility} className={`absolute cursor-pointer text-black dark:text-white bottom-2 right-2 transition-all duration-200 text-[18px] ease-in-out block`}>
                        {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                : <></>}
            {/* Password */}

            <ButtonSubmit
                onClick={() => handleSubmit()}
                disabled={!isFormValid || loading}
                isFormValid={isFormValid}
                className={`sm:!h-[38px] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Signing in...' : 'Sign in'}
            </ButtonSubmit>

            <button
                onClick={() => openModal(<Forgot />)}
                className="mt-5 mb-10 cursor-pointer w-full md:w-[300px] h-[34px] flex items-center justify-center border-[1px] transition-all duration-300 ease-in-out border-[#d1d9de] dark:border-[#566470] bg-white dark:bg-black hover:bg-[#ecf5fd] dark:hover:bg-[#d8dbdc] rounded-[20px]">
                <span
                    className="text-black text-sm md:text-[15px] font-semibold dark:text-white"
                >Forgot password?</span>
            </button>

            <span
                className="mb-20 text-[#536471] self-start dark:text-[#71767b] text-sm"
            >
                Don't have an account?
                <button onClick={() => openModal(<SignUp />)} className="text-[#1d9bf0] ml-1 cursor-pointer hover:underline">Sign up</button>
            </span>
        </div>
    )
}

export default Login;