"use client"
import React, { useState } from "react"
import Drawer from '@/components/organisms/Drawer';
import SearchBox from "../atoms/searchBox";
import GaanaAppIcon from "../atoms/gaanaAppIcon";
import ChangeLangIcon from "../atoms/ChangeLangIcon";
import NightModeIcon from "../atoms/NightModeIcon";
import OpenSideBarIcon from "../atoms/OpenSideBarIcon";

const Header = () => {
    const [openNav, setOpenNav] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    React.useEffect(() => {

        const handleOutsideClick = (event: any) => {
            if (isDrawerOpen && !event.target.closest(".drawer-container")) {
                setIsDrawerOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isDrawerOpen]);
    console.log("isDrawerOpen", isDrawerOpen);


    const onclickhandler = () => {

        setIsDrawerOpen(!isDrawerOpen)

    }
    return (
        <>

            <div className="-m-6 max-h-[768px] w-full sticky top-0 z-50  overflow-scroll bg-[#f5f5f5]">
                <div className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                    <div className="flex items-center justify-between text-blue-gray-900">
                         {isDrawerOpen &&
                            <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 drawer-container">
                                <Drawer />
                            </aside>
                        }
                        <div className="flex items-center gap-10 mt-8 ml-9">

                            <button
                                onClick={onclickhandler}
                                className="hidden lg:inline-block"
                            >
                           <OpenSideBarIcon />
                            </button>
                            <span>
                                <GaanaAppIcon />
                            </span>
                            <span>
                                <SearchBox />
                            </span>
                        </div>
                        <div className="flex items-center gap-10 mt-8 ml-9">
                            <span>

                                <ChangeLangIcon />
                            </span>
                            <span>
                                <NightModeIcon />
                                </span>
                        </div>

                    </div>

                </div>

            </div>

        </>

    )
}

export default Header;