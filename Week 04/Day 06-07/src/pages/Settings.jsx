import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Application Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configure global preferences and notifications.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Email Notifications</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Receive weekly digests and security alerts.</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
              notifications ? "bg-blue-600 justify-end" : "bg-gray-300 dark:bg-gray-600 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Auto Save Drafts</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Automatically save modified data locally.</p>
          </div>
          <button
            onClick={() => setAutoSave(!autoSave)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
              autoSave ? "bg-blue-600 justify-end" : "bg-gray-300 dark:bg-gray-600 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md" />
          </button>
        </div>
      </div>
    </div>
  );
}
