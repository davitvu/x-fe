import { Link, useLocation } from "react-router";

type TabNavigate = "None" | "home" | "explore" | "grok" | "notifications" | "messages" | "communities";

interface TabComponentProps {
    to: string;
    tabName: TabNavigate;
    activeIcon: React.ReactNode;
    inactiveIcon: React.ReactNode;
    currentTab: TabNavigate;
}

export const TabComponent = ({
    to,
    tabName,
    activeIcon,
    inactiveIcon,
    currentTab,
}: TabComponentProps) => {
    const isActive = currentTab === tabName;

    return (
        <Link
            to={to}
            className="flex items-center justify-center grow"
        >
            {isActive ? activeIcon : inactiveIcon}
        </Link>
    )
}


const NavBottom = () => {
    const location = useLocation();

    const getCurrentTab = (): TabNavigate => {
        const pathname = location.pathname;
        if (pathname === "/" || pathname === "/home") return "home";
        if (pathname === "/explore") return "explore";
        if (pathname === "/grok") return "grok";
        if (pathname === "/notifications") return "notifications";
        if (pathname === "/messages") return "messages";
        if (pathname === "/communities") return "communities";
        return "None";
    };

    const currentTab = getCurrentTab();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex w-full bg-white h-header-height dark:bg-black">
            <TabComponent
                to="/home"
                tabName="home"
                currentTab={currentTab}
                activeIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
                    </svg>
                    
                }
                inactiveIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path>
                    </svg>
                }
            />
            <TabComponent
                to="/explore"
                tabName="explore"
                currentTab={currentTab}
                activeIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z"></path>
                    </svg>
                }
                inactiveIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                    </svg>
                }
            />
            <TabComponent
                to="/grok"
                tabName="grok"
                currentTab={currentTab}
                activeIcon={
                    <svg className="w-[26px]" viewBox="0 0 42 42" aria-hidden="true">
                        <path clip-rule="evenodd" d="M8 0C3.582 0 0 3.582 0 8v26c0 4.418 3.582 8 8 8h26c4.418 0 8-3.582 8-8V8c0-4.418-3.582-8-8-8H8zm19.997 17.35l-11.1 8.19 15.9-15.963v.015L37.391 5c-.082.117-.165.23-.248.345-3.49 4.804-5.194 7.153-3.826 13.03l-.009-.008c.943 4.001-.065 8.438-3.322 11.693-4.106 4.107-10.677 5.02-16.087 1.324l3.772-1.745c3.454 1.355 7.232.76 9.947-1.954 2.716-2.714 3.325-6.666 1.96-9.956-.259-.623-1.037-.78-1.58-.378zm-13.292-2.574c-3.314 3.31-3.983 9.047-.1 12.755l-.003.003L4 37c.663-.913 1.485-1.776 2.306-2.639l.04-.042c2.346-2.464 4.67-4.906 3.25-8.357-1.903-4.622-.795-10.038 2.73-13.56 3.664-3.66 9.06-4.583 13.568-2.729.998.37 1.867.897 2.545 1.387l-3.764 1.737c-3.505-1.47-7.52-.47-9.97 1.98z"></path>
                    </svg>
                }
                inactiveIcon={
                    <svg className="w-[26px]" viewBox="0 0 33 32" aria-hidden="true">
                        <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
                    </svg>
                }
            />
            <TabComponent
                to="/notifications"
                tabName="notifications"
                currentTab={currentTab}
                activeIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z"></path>
                    </svg>
                }
                inactiveIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                    </svg>
                }
            />
            <TabComponent
                to="/messages"
                tabName="messages"
                currentTab={currentTab}
                activeIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"></path>
                    </svg>
                }
                inactiveIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                    </svg>
                }
            />
            <TabComponent
                to="/communities"
                tabName="communities"
                currentTab={currentTab}
                activeIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-1.608 1.732-2.762 4.389-2.869 8.248l-.03 1.083zM9.616 9.27C10.452 8.63 11 7.632 11 6.5 11 4.57 9.433 3 7.5 3S4 4.57 4 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73zm6.884 1.726c-3.264 0-6.816 2.358-7 8.977L9.471 21h14.057l-.029-1.027c-.184-6.618-3.736-8.977-7-8.977zm2.116-1.726C19.452 8.63 20 7.632 20 6.5 20 4.57 18.433 3 16.5 3S13 4.57 13 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73z"></path>
                    </svg>
                }
                inactiveIcon={
                    <svg className="w-[26px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path>
                    </svg>
                }
            />
        </nav>
    )
}

export default NavBottom;
