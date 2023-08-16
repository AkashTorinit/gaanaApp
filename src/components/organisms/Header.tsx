"use client"
import React, { useState } from "react"
import Drawer from '@/components/organisms/Drawer';
import SearchBox from "../atoms/searchBox";
import GaanaAppIcon from "../atoms/gaanaAppIcon";
import ChangeLangIcon from "../atoms/ChangeLangIcon";
import NightModeIcon from "../atoms/NightModeIcon";

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


        // Add event listener to close the drawer when clicking outside
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

            <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll bg-[#f5f5f5]">
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
                                <span> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" id="IconChangeColor" height="200" width="200"> <g> <path fill="none" d="M0 0h24v24H0z" id="mainIconPathAttribute"></path> <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z" id="mainIconPathAttribute" ></path> </g> </svg></span>
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