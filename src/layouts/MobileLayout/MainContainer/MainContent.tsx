import { Outlet } from "react-router";

const MainContent = () => {
    return (
        <div className={`mt-header-height`}>
            <Outlet />
        </div>
    )
}

export default MainContent;