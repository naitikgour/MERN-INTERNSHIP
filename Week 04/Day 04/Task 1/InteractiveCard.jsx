export default function InteractiveCard() {
  return (
    <div className="max-w-sm p-5 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800">React Training</h3>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        Learn React with hands-on examples and real-world internship projects.
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="mt-3 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full text-sm"
      />
      <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition-all duration-200 font-medium">
        Read More
      </button>
    </div>
  );
}
