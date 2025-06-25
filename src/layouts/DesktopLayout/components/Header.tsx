import LogoX from "../../../components/LogoX";

const Header = () => {
    return (
        <div className="flex flex-col items-end p-[5px]">
            <div className="max-w-[259px] w-[80px] fixed h-screen">
                <div className="w-[50px]">
                    <LogoX />
                </div>
                <div>
                    <div>
                        header1
                    </div>
                    <div>
                        header2
                    </div>
                    <div>
                        header2
                    </div>
                    <div>
                        header2
                    </div>
                    <div>
                        header2
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;