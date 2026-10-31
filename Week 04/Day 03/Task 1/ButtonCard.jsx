export default function ButtonCard() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-sm mb-6">
      <h3 className="text-xl font-bold text-gray-800">Tailwind Component</h3>
      <p className="text-gray-600 my-2">Converted from regular CSS to modern utility-first Tailwind classes.</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Click Me
      </button>
    </div>
  );
}
