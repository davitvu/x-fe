import { useEffect, useState } from "react";
import { ButtonSubmit } from "../../../components/ButtonSubmit";

const Forgot = () => {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = username.trim() !== "";
        setIsFormValid(isValid);
    }, [username]);

    const validateUsername = () => {
        if (username.trim() === '') {
            setErrors(true);
            return false;
        }

        // logic query db so sánh user

        return true;
    }

    // cái này không cần thiết lắm cứ vứt đây tạm
    // const validateForm = () => {
    //     return validateUsername();
    // }

    const handleSubmit = () => {
        if (validateUsername()) {
            // Proceed with login
            alert("username: " + username);
        }
    };


    return (
        <div className="flex flex-col justify-between h-screen px-7 sm:p-0 sm:w-[68%] sm:mx-auto sm:h-auto">
            <div>
                <h1 className="mt-5 dark:text-[#e7e9ea] text-[25px] font-bold">Find your X account</h1>
                <p className="mb-6 text-[#71767b] text-sm w-[80%] sm:w-[85%]">Enter the email, phone number, or username associated with your account to change your password.</p>

                <div className={`group relative mb-5 border rounded-sm h-[58px] w-full transition-all duration-200 ease-in-out 
                ${errors
                        ? 'border-[#f4212e] dark:border-[#f4212e]'
                        : 'border-light-blueish-gray dark:border-[#333639] has-[:focus]:border-X-blue has-[:focus]:shadow-[0px_0px_0px_1px_rgb(29,155,240)]'}`}
                    onClick={() => document.getElementById('username')?.focus()}
                >
                    <input id="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors(false); // Thêm: clear error khi user type
                        }}
                        onBlur={validateUsername}
                        className={`h-[19px] dark:text-white absolute bottom-2 left-2 right-2 w-[100%-8px] outline-none transition-all duration-200 ease-in-out peer`}
                        type="text" />
                    <label htmlFor="username"
                        className={`cursor-auto absolute peer-focus:top-4 peer-focus:text-sm top-1/2 left-2 -translate-y-1/2 transition-all duration-200 ease-in-out peer-focus:text-X-blue leading-[23px] text-base
                        ${username ? 'top-4 text-sm' : 'top-1/2 -translate-y-1/2'}
                        ${document.activeElement?.id === 'username' ? 'text-X-blue' : ''}
                        ${errors && !username ? "!text-[#f4212e] dark:text-[#f4212e]" : "dark:text-[#71767b] text-dark-blueish-gray"}`}
                    >Email, phone number, or username</label>
                </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center justify-center py-6 bg-white sm:pt-10 dark:bg-black">
                <ButtonSubmit
                    onClick={() => handleSubmit()}
                    disabled={!isFormValid}
                    isFormValid={isFormValid}
                />
            </div>
        </div>
    )
}

export default Forgot;