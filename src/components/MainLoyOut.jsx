import React from "react";
import { Outlet } from "react-router-dom";
//import Navbar from "./Navbar";
//import Footer from "./Footer";

function MainLoyOut() {
  return (
    <>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLoyOut;
