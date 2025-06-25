import Header from "./components/Header";
import TwoColsLayout from "./MainContainer/TwoColsLayout";

const DesktopLayout = () => {

    return (
        <div className="tablet:flex">
            <div className="border-r tablet:w-width-header-desktop border-extra-light-gray">
                <Header />
            </div>
            <div className="tablet:grow">
                <TwoColsLayout />
            </div>
        </div>
    )
}

export default DesktopLayout;