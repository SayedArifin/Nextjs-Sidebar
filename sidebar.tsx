"use client"
import { useState, useEffect, useRef } from 'react';
import { BiHome, BiMenuAltLeft } from "react-icons/bi";
import Link from 'next/link';
import { MdPublishedWithChanges } from "react-icons/md";
import { BsSunFill } from "react-icons/bs";
interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isSidebarOpen && !sidebarRef.current?.contains(target)) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const sidebarItems = [
    { icon: <BiHome size={25} />, text: "Dashboard", href: "/dashboard" },
    { icon: <MdPublishedWithChanges size={25} />, text: "Modify", href: "/dashboard/modify" },
  ];

  return (
    <div>
      <div
        className={`fixed inset-0 z-40 bg-black opacity-50 ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={closeSidebar}
      ></div>

      <nav className={`fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? 'shadow-lg' : ''}`}>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <BiMenuAltLeft size={25} className='mr-2' />
              </button>
              <p className="font-bold text-inherit text-2xl">
                app Name
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <BsSunFill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                  {item.icon}
                  <span className="ms-3 flex-1 whitespace-nowrap">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className={`p-4 sm:ml-64 `}>
        <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
