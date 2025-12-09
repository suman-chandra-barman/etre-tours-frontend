import { Clock } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
      <button className="flex flex-col items-center text-blue-600">
        <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
        </svg>
        <span className="text-xs">Tickets</span>
      </button>
      <button className="flex flex-col items-center text-gray-400 hover:text-gray-600">
        <Clock className="w-6 h-6 mb-1" />
        <span className="text-xs">History</span>
      </button>
    </div>
  );
}

export default Sidebar;
