import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onToggleSidebar }) {
  const { dark, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-700 dark:text-gray-200 text-2xl focus:outline-none"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      </div>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}
