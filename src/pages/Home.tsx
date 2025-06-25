import { useEffect, useRef, useState } from "react";
import Foryou from "./MainHomeContent/Foryou";
import Following from "./MainHomeContent/Following";
import { FABNewTweet } from "../components/FABComponent";
import { useTitle } from "../features/useTitle";
import { useIsMobile } from "../hooks/useMediaQuery";

type Tab = "Foryou" | "Following";

const HomePage = () => {
    useTitle("Home");
    const isMobile = useIsMobile();

    const [tabActive, setTabActive] = useState<Tab>("Foryou");
    const foryouButtonRef = useRef<HTMLButtonElement>(null);
    const followingButtonRef = useRef<HTMLButtonElement>(null);
    const [tabWidths, setTabWidths] = useState({
        Foryou: 0,
        Following: 0
    });

    useEffect(() => {
        if (foryouButtonRef.current && followingButtonRef.current) {
            setTabWidths({
                Foryou: foryouButtonRef.current.offsetWidth,
                Following: followingButtonRef.current.offsetWidth
            });
        }
    }, [tabActive]);

    return (
        <>
            {/** Mobile */}
            {isMobile &&
                <>
                    <FABNewTweet />
                </>
            }
            {/** Header Mobile */}

            {/* Tab */}
            <div className="fixed left-0 right-0 z-0 cursor-pointer tablet:sticky bg-white/95 backdrop-blur-xs border-b border-extra-light-gray tablet:top-0 tablet:right-0 top-header-height dark:bg-black">
                <div className="flex px-0 h-header-height ">
                    <div onClick={() => setTabActive("Foryou")}
                        className={`flex relative items-center justify-center grow active:bg-near-black-20-opa`}
                    >
                        <button
                            ref={foryouButtonRef}
                            className={`text-[15px] ${tabActive === "Foryou" ? "text-near-black font-bold" : "font-medium text-dark-blueish-gray"}`}
                        >
                            For you
                        </button>
                        <div
                            className={`absolute bottom-0 h-1 transform -translate-x-1/2 rounded-full left-1/2 bg-X-blue transition-all duration-300`}
                            style={{
                                width: tabActive === "Foryou" ? `${tabWidths.Foryou}px` : "0px"
                            }}
                        ></div>
                    </div>
                    <div onClick={() => setTabActive("Following")}
                        className={`flex relative items-center justify-center grow active:bg-near-black-20-opa`}
                    >
                        <button
                            ref={followingButtonRef}
                            className={`text-[15px] ${tabActive === "Following" ? "text-near-black font-bold" : "font-medium text-dark-blueish-gray"}`}
                        >
                            Following
                        </button>
                        <div
                            className={`absolute bottom-0 h-1 transform -translate-x-1/2 rounded-full left-1/2 bg-X-blue transition-all duration-300`}
                            style={{
                                width: tabActive === "Following" ? `${tabWidths.Following}px` : "0px"
                            }}
                        ></div>
                    </div>
                </div>
                {/* <div className="border-t border-b border-extra-light-gray text-X-blue font-[15px]  h-[48px] flex justify-center items-center">
                            <p>Show 91 posts</p>
                        </div> */}
            </div>
            {/* Tab */}

            {/* Content */}
            <div className="px-4 mt-[106px]"> {/** tinh ca cai show 91 posts la 106px */}
                {tabActive === "Foryou" ? <Foryou /> : <Following />}
            </div>
            {/* Content */}
        </>
    )
};

export default HomePage;