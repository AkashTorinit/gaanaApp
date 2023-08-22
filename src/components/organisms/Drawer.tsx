import React from "react";
import ToggleButton from "../atoms/toggleButton";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';

const menuItems = [
    { title: "Home", link: "home" },
    { title: "Radio", link: "#" },
    { title: "Podcast", link: "#" },
    { title: "My Music", link: "#" },
];

const Drawer = () => {
    const session = useSession();
    const pathname = usePathname();



    let Path = pathname.substring(1).toString()


    return (
        <>
            <div className="py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                width="35"
                                height="35"
                                viewBox="0 0 18 18"
                            >
                            </svg>
                            <span className="ml-3 text-sm">
                                {session?.data?.user
                                    ? `Hello, ${session?.data?.user?.name}`
                                    : "Login / Sign Up"}
                            </span>
                        </a>
                    </li>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.link}
                                className={`flex items-center text-sm p-2 ${item.link == Path && "text-red-700"} text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    {item.title}
                                </span>
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <span className="flex-1 ml-3 text-sm whitespace-nowrap">
                                Night Mode
                            </span>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                <ToggleButton />
                            </span>
                        </a>
                    </li>
                    <li>
                        <button onClick={() => signOut()}>
                            <span className="flex-1 ml-3 text-sm whitespace-nowrap">
                                Log out
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Drawer;
