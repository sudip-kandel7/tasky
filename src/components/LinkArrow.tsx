import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LinkArrow({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <div className="group inline-flex flex-col cursor-pointer items-start">
      <div className="inline-flex items-center">
        <Link
          to={href}
          className="text-md text-[#657081] transition-colors duration-300 group-hover:text-gray-500"
        >
          {children}
        </Link>

        <MoveRight
          size={16}
          className="ml-1 text-[#657081] transition-all duration-300 group-hover:text-gray-500 group-hover:translate-x-1"
        />
      </div>

      <span className="mt-1 h-0.5 w-0 bg-gray-500 transition-all duration-300 group-hover:w-full rounded-r-xl rounded-l-xl"></span>
    </div>
  );
}
