/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
// import DashIcon from "../../components/icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
        return (
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span className={"font-bold text-brand-500 dark:text-white"}>
                  x
                </span>
                <p className={`leading-1 ml-4 flex font-bold text-navy-700 dark:text-white`}>
                  test
                </p>
              </li>
          </div>
          
          // <Link key={index} to={route.layout + "/" + route.path}>
          //   <div className="relative mb-3 flex hover:cursor-pointer">
          //     <li
          //       className="my-[3px] flex cursor-pointer items-center px-8"
          //       key={index}
          //     >
          //       <span
          //         className={`${
          //           activeRoute(route.path) === true
          //             ? "font-bold text-brand-500 dark:text-white"
          //             : "font-medium text-gray-600"
          //         }`}
          //       >
          //         {route.icon ? route.icon : <DashIcon />}{" "}
          //       </span>
          //       <p
          //         className={`leading-1 ml-4 flex ${
          //           activeRoute(route.path) === true
          //             ? "font-bold text-navy-700 dark:text-white"
          //             : "font-medium text-gray-600"
          //         }`}
          //       >
          //         {route.name}
          //       </p>
          //     </li>
          //     {activeRoute(route.path) ? (
          //       <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
          //     ) : null}
          //   </div>
          // </Link>
        );
}

export default SidebarLinks;
