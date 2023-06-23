import { HiHome } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { TbGraph } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";

export default function SideBar() {
  // Getting the current Location Object using react-router
  const location = useLocation();

  // Matching the pathname(ex - /home) from the current active Page.
  const activeChecker = (page) => location.pathname === `/${page}`;

  // Stored icons and its corresponding pages in array to map through it in jsx.
  const icons = [
    { icon: HiHome, page: "" },
    { icon: FiSearch, page: "search" },
    { icon: TbGraph, page: "forecast" },
  ];

  return (
    <section
      className="sidebar fixed bottom-0 bg-slate-10 z-10 pt-4 border-t-2 border-t-slate-20"
      id="sidebar"
    >
      <ul className="flex justify-evenly pb-3 w-screen text-4xl text-white">
        {icons.map(
          (
            { icon: Icon, page } // Destructuring the value of icon and page from the icon object.
          ) => (
            <li key={page}>
              <NavLink to={`/${page}`}>
                <Icon
                  strokeWidth="1"
                  fill={activeChecker(page) ? "white" : "none"}
                  stroke={
                    activeChecker(page) && page !== "search"
                      ? "#1e293b"
                      : "white"
                  }
                />
              </NavLink>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
