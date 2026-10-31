import { useState } from "react";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  const initialUsers = [
    { id: 1, name: "Naitik Gour", email: "naitik@example.com", role: "Administrator", status: "Active" },
    { id: 2, name: "Aman Verma", email: "aman@example.com", role: "Developer", status: "Active" },
    { id: 3, name: "Sneha Roy", email: "sneha@example.com", role: "Product Manager", status: "Active" },
    { id: 4, name: "Riya Sharma", email: "riya@example.com", role: "UI Designer", status: "Inactive" },
  ];

  const filteredUsers = initialUsers.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Users Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage registered system accounts.</p>
        </div>
        <input
          type="text"
          placeholder="Search user by name, email..."
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900 dark:text-white">{u.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{u.email}</div>
                </td>
                <td className="px-6 py-4">{u.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    u.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
