import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
      <Link href="/">
        <Image src="/logo.svg" alt="ETRE Tours Logo" width={32} height={32} />
      </Link>
      <Link href="tickets">
        <button className="flex flex-col items-center text-blue-600 cursor-pointer">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
          </svg>
          <span className="text-xs">Tickets</span>
        </button>
      </Link>
      <Link href="history">
        <button className="flex flex-col items-center text-gray-400 hover:text-gray-600 cursor-pointer">
          <Clock className="w-6 h-6 mb-1" />
          <span className="text-xs">History</span>
        </button>
      </Link>
    </div>
  );
}

export default Sidebar;
