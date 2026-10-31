export default function Reports() {
  const reports = [
    { title: "Weekly User Acquisition", date: "Oct 28, 2025", type: "PDF", status: "Generated" },
    { title: "Monthly Sales & Revenue", date: "Oct 25, 2025", type: "CSV", status: "Ready" },
    { title: "Server Performance Audit", date: "Oct 20, 2025", type: "LOG", status: "Archived" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Download and inspect scheduled analytics reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((r, i) => (
          <div key={i} className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{r.type} Report</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">{r.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Generated: {r.date}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded">
                {r.status}
              </span>
              <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
