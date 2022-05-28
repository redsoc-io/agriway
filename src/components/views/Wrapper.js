import Nav from '../Nav';
import Sidebar from '../Sidebar';
import { useState } from "react";
import { GiHamburgerMenu, GiFarmer } from "react-icons/gi";

export default function Wrapper(props) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="view-area">
            <Nav session={props.session} />
            <div className="w-full h-full flex items-center justify-center">
                <div className={`${collapsed ? 'lg:w-1/12 lg:flex hidden' : 'w-3/12'} h-full`}>
                    <Sidebar
                        session={props.session}
                        toggleCollapse={() => { setCollapsed(!collapsed) }}
                        collapsed={collapsed}
                    />
                </div>
                <div className={`${collapsed ? 'w-11/12' : 'w-9/12'} h-full p-3`}>
                    {props.children}
                </div>
                <button className="fixed bottom-7 right-7 rounded-full bg-blue-600 p-3 text-white text-3xl shadow lg:hidden"
                    onClick={() => { setCollapsed(!collapsed) }}
                >
                    <GiHamburgerMenu />
                </button>
            </div>
        </div>
    )
}