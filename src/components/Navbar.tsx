import { Moon, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase.ts";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  username: string;
};

export default function Navbar({ username }: NavbarProps) {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white flex justify-around items-center border-b border-gray-200 pb-0.5">
        <div className="flex items-center">
          <img src="./logo.png" alt="logo" className="w-17 h-17" />
          <p className="flex flex-col">
            <span className="font-medium">Tasky</span>
            <span className="text-sm text-gray-500 pl-0.5 -mt-1">टास्की</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 cursor-pointer ml-3 text-sm">
            {username}
          </span>
          <button className="p-2 rounded-md text-gray-500 hover:bg-blue-400 hover:text-white transition">
            <Moon size={20} />
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-md text-gray-500 hover:bg-blue-400 hover:text-white transition"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
