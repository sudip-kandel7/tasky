import { supabase } from "../lib/supabase.ts";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <LogOut
        size={16}
        className="text-gray-500 cursor-pointer hover:text-gray-700 ml-3"
        onClick={logout}
      />
    </div>
  );
}
