import { HeaderHome, HeaderProfile } from "./components/Header";
import MainContent from "./MainContainer/MainContent";
import NavBottom from "./components/NavBottom";
import { useLocation } from "react-router";
import { ProfileProvider } from "../../contexts/ProfileContext";

const MobileLayout = () => {
    const location = useLocation();
    const pathname = location.pathname

    /**     Header     */
    const shouldShowHeader = () => {
        const hiddenHeaderPages = [
            '/temp'
        ];

        if (hiddenHeaderPages.includes(pathname)) {
            return false;
        }

        // them dieu kien check pattern match (sub-routes)
        const hiddenPatterns = ['/blabla/', '/setup../'];
        if (hiddenPatterns.some(pattern => pathname.startsWith(pattern))) {
            return false;
        }

        return true;
    };

    const getHeaderComponent = () => {
        if (!shouldShowHeader) {
            return null;
        }

        switch (pathname) {
            case '/home':
                return <HeaderHome />

            default:
                // chi danh cho route profile: /username
                if (pathname.startsWith('/') && pathname.split('/').length === 2) {
                    return <HeaderProfile />;
                }
                return <></>;
            // de tam o day co the sau nay se can
            // const segments = pathname.split('/');
            // if (segments.length === 2 && segments[1]) {
            //     const potentialUsername = segments[1];
            //     // Danh sách các route hệ thống - KHÔNG phải username
            //     const systemRoutes = ['auth', 'admin', 'api', 'settings', 'help', 'support', 'legal', 'privacy'];
            //     // Chỉ hiển thị HeaderProfile nếu KHÔNG phải route hệ thống
            //     if (!systemRoutes.includes(potentialUsername)) {
            //         return <HeaderProfile username={potentialUsername} />;
            //     }
            // }
        }

    }
    /**     Header     */

    /**     Navbottom     */
    const shouldShowNavBottom = () => {
        const hiddenNavBottomPages = [
            'account', // cai nay vi du
        ];

        if (hiddenNavBottomPages.includes(pathname)) {
            return false;
        }

        // them dieu kien check pattern match (sub-routes)
        const hiddenPatterns = ['/auth/', '/admin/', '/settings/'];
        if (hiddenPatterns.some(pattern => pathname.startsWith(pattern))) {
            return false;
        }

        return true;
    };
    /**     Navbottom     */

    return (
        <ProfileProvider>
            <div>
                <div>
                    {/* Header */}
                    {shouldShowHeader() && getHeaderComponent()}
                    {/* Nav Bottom */}
                    {shouldShowNavBottom() && <NavBottom />}
                </div>
                <MainContent />
            </div>
        </ProfileProvider>
    )
}

export default MobileLayout;