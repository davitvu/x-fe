import MobileLayout from "./MobileLayout/MobileLayout";
import DesktopLayout from "./DesktopLayout/DesktopLayout";
import { useIsMobile } from "../hooks/useMediaQuery";

const AppLayout = () => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <MobileLayout/>;
    } else {
        return <DesktopLayout />;
    }
}

export default AppLayout;