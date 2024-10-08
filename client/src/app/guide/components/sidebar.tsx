"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { routes } from "../../../constants/routeURL";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiMenuLine,
} from "react-icons/ri";

interface SidebarItem {
  href?: string;
  label: string;
  subItems?: { href: string; label: string }[];
}

const sidebarItems: SidebarItem[] = [
  { href: routes.guide.serviceinfo, label: "Service Info" },
  { href: routes.guide.root, label: "Guide Home" },
  {
    label: "Web Guide",
    subItems: [
      { href: routes.guide.webGuide.frontinfo, label: "Frontend" },
      { href: routes.guide.webGuide.backinfo, label: "Backend" },
      { href: routes.guide.webGuide.dbinfo, label: "Database" },
    ],
  },
  {
    label: "App Guide",
    subItems: [{ href: routes.guide.appGuide.desktopinfo, label: "Desktop" }],
  },
  { href: routes.guide.license, label: "License" },
];

export default function Sidebar() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const toggleItem = (label: string) => {
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderSidebarContent = () => (
    <ul className="space-y-2">
      {sidebarItems.map((item, index) => (
        <li key={index}>
          {item.subItems ? (
            <div>
              <button
                onClick={() => toggleItem(item.label)}
                className="hover:text-blue-700 w-full text-left flex justify-between items-center transition-colors duration-300"
              >
                {item.label}
                <span>
                  {openItems[item.label] ? (
                    <RiArrowDropUpLine />
                  ) : (
                    <RiArrowDropDownLine />
                  )}
                </span>
              </button>
              {openItems[item.label] && (
                <ul className="pl-4 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link href={subItem.href} className="hover:text-blue-700">
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link href={item.href!} className="hover:text-blue-700">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {isSmallScreen && (
        <button
          ref={buttonRef}
          onClick={toggleSidebar}
          className="fixed top-16 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        >
          <RiMenuLine size={24} />
        </button>
      )}
      <nav
        ref={sidebarRef}
        className={`${
          isSmallScreen
            ? "fixed top-24 left-4 w-64 transform transition-all duration-300 ease-in-out z-40"
            : "min-w-48 h-screen"
        } bg-white p-4 rounded-lg shadow ${
          isSmallScreen && !isSidebarOpen
            ? "opacity-0 invisible"
            : "opacity-100 visible"
        }`}
      >
        {renderSidebarContent()}
      </nav>
    </>
  );
}
