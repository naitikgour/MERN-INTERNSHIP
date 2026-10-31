import Card from "../components/Card";

export default function Dashboard() {
  const stats = [
    { title: "Total Users", value: "1,250", change: "+12% this month" },
    { title: "Orders Today", value: "78", change: "+5% vs yesterday" },
    { title: "Revenue", value: "$8,900", change: "+18% growth" },
    { title: "Pending Reports", value: "14", change: "Requires review" },
  ];

  const chartData = [
    { month: "Jan", height: "60%" },
    { month: "Feb", height: "80%" },
    { month: "Mar", height: "45%" },
    { month: "Apr", height: "90%" },
    { month: "May", height: "70%" },
    { month: "Jun", height: "100%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back! Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} title={s.title} value={s.value} change={s.change} />
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue Trends</h3>
        <div className="h-48 flex items-end justify-between gap-4 pt-6 px-4 border-b border-gray-200 dark:border-gray-700">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full max-w-[40px] bg-blue-500 hover:bg-blue-600 rounded-t transition-all duration-300"
                style={{ height: d.height }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
