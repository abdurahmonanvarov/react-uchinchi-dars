import React from "react";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogeOut } from "../hoks/useLogeOut";

function Saitbar() {
  const { logeout } = useLogeOut();
  const { user } = useSelector((store) => store.user);
  return (
    <div className="bg-violet-400 min-h-screen w-[350px] p-10 text-white pr-0 flex flex-col">
      <Avatar user={user} />
      <ul className="mt-3 mb-auto">
        <li className="nav-item w-full">
          <NavLink className="block px-3 py-2 rounded-l-3xl" to="/">
            Project
          </NavLink>
        </li>
        <li className="nav-item w-full">
          <NavLink className="block px-3 py-2 rounded-l-3xl" to="/create">
            Create
          </NavLink>
        </li>
        <li className="nav-item w-full">
          <NavLink className="block px-3 py-2 rounded-l-3xl" to="/setting">
            Setting
          </NavLink>
        </li>
      </ul>
      <div>
        <button onClick={logeout} className="btn btn-primary block ml-7">
          Loge out
        </button>
      </div>
    </div>
  );
}

export default Saitbar;
