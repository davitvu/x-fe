import { useEffect, useState } from "react";
import { useModal } from "../../../contexts/ModalContext";
import Login from "./Login";
import { ButtonSubmit } from "../../../components/Auth/ButtonSubmit";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { findUsername, login, signup } from "../../../services/auth.service";
import { useCurrentAuthenticated } from "../../../contexts/Authenticate.context";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDebouncedCallback } from 'use-debounce';

const SignUp = () => {
    const { openModal, closeModal } = useModal();
    const { setIsAuthenticated, refetchUser } = useCurrentAuthenticated();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [lengthInputFullname, setLengthInputFullname] = useState(0);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(true);

    const [errors, setErrors] = useState({
        name: false,
        username: false,
        email: false,
        password: false
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        const isValid = name.trim() !== '' &&
            username.trim() !== '' && isUsernameValid &&
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.trim()) &&
            password.length >= 6 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password);
        setIsFormValid(isValid);
    }, [name, username, isUsernameValid, email, password]);

    const HandlerQueryUsername = async (username: string) => {
        const res = await findUsername(username);
        return res?.data?.success || false;
    }

    const debouncedUsernameCheck = useDebouncedCallback(async (value: string) => {
        if (!value.trim()) {
            setIsUsernameValid(false);
            setSpinLoading(false);
            return;
        }

        try {
            setSpinLoading(true);
            const result = await HandlerQueryUsername(value);
            if (result) {
                setIsUsernameValid(false);
                setErrors(prev => ({ ...prev, username: true }));
                toast.error('Username đã tồn tại');
            } else {
                setIsUsernameValid(true);
                setErrors(prev => ({ ...prev, username: false }));
            }
        } catch (error) {
            setIsUsernameValid(false);
            toast.error('Lỗi kiểm tra username');
        } finally {
            setSpinLoading(false);
        }
    }, 700);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        setErrors(prev => ({ ...prev, username: false }));
        debouncedUsernameCheck(value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setErrors(prev => ({ ...prev, email: false }));
    };

    useEffect(() => {
        return () => {
            debouncedUsernameCheck.cancel();
        };
    }, []);

    const validateUsername = () => {
        if (username.trim() === '') {
            setErrors(prev => ({ ...prev, username: true }));
            return false;
        }
        return isUsernameValid;
    };

    const validateName = () => {
        if (name.trim() === '') {
            setErrors(prev => ({ ...prev, name: true }));
            return false;
        }
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isValid = emailRegex.test(email.trim());
        setErrors(prev => ({ ...prev, email: !isValid }));
        return isValid;
    };

    const validatePassword = () => {
        const hasMinLength = password.length >= 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
        setErrors(prev => ({ ...prev, password: !isValid }));
        return isValid;
    };

    const validateForm = () => {
        const isNameValid = validateName();
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        return isNameValid && isUsernameValid && isPasswordValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        setLoading(true);
                        const res = await signup(name, username, email, password);

                        if (res && res.data && res.data.success && res.data.data) {
                            resolve(res.data.message);
                            const resLogin = await login(username, password);
                            if (resLogin && resLogin.data.success) {
                                resolve(resLogin.data.message);
                                await refetchUser();
                                closeModal();
                                setIsAuthenticated(true);
                            }
                        } else if (res.data && !res.data.success) {
                            reject(res.data.message);
                        } else {
                            reject('Signup failed');
                        }
                    } catch (error: any) {
                        reject(error.data.message || 'Signup failed');
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

    const handleValueInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setName(value);
            setLengthInputFullname(value.length);
        }
    };

    // color validate input: #f4212e

    return (
        <div className="flex flex-col justify-between h-screen px-9 sm:p-0 sm:w-[74%] sm:mx-auto sm:h-auto">
            <div>
                <h1 className="my-5 dark:text-[#e7e9ea] text-[25px] font-bold">Create your account</h1>

                {/* Name */}
                <div className={`group relative mb-5 border rounded-sm h-[58px] w-full transition-all duration-200 ease-in-out 
                ${errors.name
                        ? 'border-[#f4212e] dark:border-[#f4212e]'
                        : 'border-[#cfd9de] dark:border-[#333639] has-[:focus]:border-[#1d9bf0] has-[:focus]:shadow-[0px_0px_0px_1px_rgb(29,155,240)]'}`}
                    onClick={() => document.getElementById('name')?.focus()}
                >
                    <input id="name"
                        value={name}
                        onChange={(e) => {
                            handleValueInputName(e);
                            setName(e.target.value);
                            setErrors(prev => ({ ...prev, name: false }));
                        }}
                        onBlur={validateName}
                        className={`h-[19px] dark:text-white absolute bottom-2 left-2 right-2 w-[100%-8px] outline-none transition-all duration-200 ease-in-out peer`}
                        type="text" />
                    <label htmlFor="name"
                        className={`cursor-auto absolute peer-focus:top-4 peer-focus:text-sm top-1/2 left-2 -translate-y-1/2 transition-all duration-200 ease-in-out peer-focus:text-[#1d9bf0] leading-[23px] text-base
                        ${name ? 'top-4 text-sm' : 'top-1/2 -translate-y-1/2'}
                        ${document.activeElement?.id === 'name' ? 'text-[#1d9bf0]' : ''}
                        ${errors.name && !name ? "!text-[#f4212e] dark:text-[#f4212e]" : "dark:text-[#71767b] text-[#536471]"}`}
                    >Name</label>
                    <label htmlFor="name"
                        className="absolute text-xs top-2 peer-focus:block hidden right-2 text-[#536471] transition-all duration-200 ease-in-out"
                    >{lengthInputFullname} / 50</label>
                </div>
                {/* Name */}

                {/* Username */}
                <div className={`group relative mb-5 border rounded-sm h-[58px] w-full transition-all duration-200 ease-in-out 
                ${errors.username
                        ? 'border-[#f4212e] dark:border-[#f4212e]'
                        : 'border-[#cfd9de] dark:border-[#333639] has-[:focus]:border-[#1d9bf0] has-[:focus]:shadow-[0px_0px_0px_1px_rgb(29,155,240)]'}`}
                    onClick={() => document.getElementById('username')?.focus()}
                >
                    <input id="username"
                        value={username}
                        onChange={(e) => handleUsernameChange(e)}
                        onBlur={validateUsername}
                        className={`h-[19px] dark:text-white pr-6 absolute bottom-2 left-2 right-2 w-[100%-8px] outline-none transition-all duration-200 ease-in-out peer`}
                        type="text" />
                    <label htmlFor="username"
                        className={`cursor-auto absolute peer-focus:top-4 peer-focus:text-sm top-1/2 left-2 -translate-y-1/2 transition-all duration-200 ease-in-out peer-focus:text-[#1d9bf0] leading-[23px] text-base
                        ${username ? 'top-4 text-sm' : 'top-1/2 -translate-y-1/2'}
                        ${document.activeElement?.id === 'username' ? 'text-[#1d9bf0]' : ''}
                        ${errors.username && !username ? "!text-[#f4212e] dark:text-[#f4212e]" : "dark:text-[#71767b] text-[#536471]"}`}
                    >Username</label>
                    <div className={`absolute bottom-2 right-2 ${spinLoading ? "block animate-spin" : "hidden"}`}>
                        <TbFidgetSpinner />
                    </div>
                </div>
                {/* Username */}

                {/* Email */}
                <div className={`group relative mb-5 border rounded-sm h-[58px] w-full transition-all duration-200 ease-in-out 
                ${errors.email
                        ? 'border-[#f4212e] dark:border-[#f4212e]'
                        : 'border-[#cfd9de] dark:border-[#333639] has-[:focus]:border-[#1d9bf0] has-[:focus]:shadow-[0px_0px_0px_1px_rgb(29,155,240)]'}`}
                    onClick={() => document.getElementById('email')?.focus()}
                >
                    <input id="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e)}
                        onBlur={validateEmail}
                        className="h-[19px] pr-6 dark:text-white absolute bottom-2 left-2 right-2 w-[100%-8px] outline-none transition-all duration-200 ease-in-out peer"
                        type="email" />
                    <label htmlFor="email"
                        className={`cursor-auto absolute peer-focus:top-4 peer-focus:text-sm top-1/2 left-2 -translate-y-1/2 transition-all duration-200 ease-in-out peer-focus:text-[#1d9bf0] leading-[23px] text-base
                        ${email ? 'top-4 text-sm' : 'top-1/2 -translate-y-1/2'}
                        ${document.activeElement?.id === 'email' ? 'text-[#1d9bf0]' : ''}
                        ${errors.email ? "!text-[#f4212e] dark:text-[#f4212e]" : "dark:text-[#71767b] text-[#536471]"}`}
                    >Email</label>
                </div>
                {/* Email */}

                <div className="mb-3">
                    <p className="mb-1 text-[14px] font-bold dark:text-white">Password requirements</p>
                    <p className="text-[#535071] dark:text-[#71767b] text-[12px] leading-3.5">Your password must be at least 6 characters long and include uppercase letters, lowercase letters, and numbers.</p>
                </div>

                {/* Password */}
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
                {/* Password */}

                <span
                    className="text-[#536471] self-start text-sm dark:text-[#71767b]"
                >
                    Have an account already?
                    <button onClick={() => openModal(<Login />)} className="text-[#1d9bf0] ml-1 cursor-pointer hover:underline sm:mb-8">Log in</button>
                </span>
            </div>
            <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center justify-center py-6 bg-white dark:bg-black">
                <ButtonSubmit
                    onClick={() => handleSubmit()}
                    disabled={!isFormValid}
                    isFormValid={isFormValid}
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </ButtonSubmit>
            </div>
        </div>
    );
}

export default SignUp;