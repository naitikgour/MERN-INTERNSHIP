import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white p-6 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Admin Panel</h2>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={navLinkClass} onClick={onClose} end>
            Dashboard
          </NavLink>
          <NavLink to="/users" className={navLinkClass} onClick={onClose}>
            Users
          </NavLink>
          <NavLink to="/reports" className={navLinkClass} onClick={onClose}>
            Reports
          </NavLink>
          <NavLink to="/settings" className={navLinkClass} onClick={onClose}>
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
