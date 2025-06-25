import { Outlet } from "react-router";
import { useIsTablet } from "../../../hooks/useMediaQuery";

const TwoColsLayout = () => {
    const isTablet = useIsTablet();

    return (
        <div className="relative flex gap-x-[29px] desktop:w-[990px] desktop-large:max-w-[1050px]">
            <div className="max-w-[601px] border-r border-extra-light-gray">
                <Outlet />
            </div>
            {!isTablet &&
                <div className="sticky h-screen top-0 tablet:w-[290px] desktop:mr-[10px] desktop:w-[360px] desktop-large:w-[420px]">
                    <div className="">
                        <div className="border-b mb-3 rounded-2xl h-[130px] p-2 border border-extra-light-gray ">
                            Right content
                        </div>
                        <div className="border-b mb-3 rounded-2xl h-[130px] p-2 border border-extra-light-gray ">
                            Right content
                        </div>
                        <div className="border-b mb-3 rounded-2xl h-[130px] p-2 border border-extra-light-gray ">
                            Right content
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TwoColsLayout;