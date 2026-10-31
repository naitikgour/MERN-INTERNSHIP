export default function Card({ title, value, change }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:scale-105 transition transform duration-200">
      <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h2>
      <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</p>
      {change && (
        <span className="inline-block mt-2 text-xs font-semibold text-green-600 dark:text-green-400">
          {change}
        </span>
      )}
    </div>
  );
}
