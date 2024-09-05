import { NavLink } from "react-router-dom";
import React from "react";

export default function NavbarAnchor({ to, text, id, className }) {
  return (
    <>
      <li>
        <NavLink
          to={to}
          id={id || ""}
          className={`block py-2 px-3 ${
            className === "black" ? "text-black" : "text-white"
          } bg-green-700 rounded bg-transparent md:p-0`}
          aria-current="page"
        >
          {text}
        </NavLink>
      </li>
    </>
  );
}
