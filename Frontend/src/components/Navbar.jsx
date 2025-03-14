import React from "react";
import { Beer } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  return (
    <>
      <Toaster />
      <div className=" flex  navbar bg-base-300 ">
        <button className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          <Beer />
          ChillOut
        </button>
        <div className="flex flex-row gap-3 justify-end w-full">
          {authUser ? (
            <>
              <button className="btn" onClick={() => navigate("/profile")}>
                Profile
              </button>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
