export default function CustomThemeDemo() {
  return (
    <div className="bg-[#F4F6F7] p-8 rounded-2xl shadow-sm border border-gray-200 mt-6 max-w-xl">
      <h2 className="text-[#4B7BEC] text-2xl font-bold mb-3">Custom Color Palette</h2>
      <p className="text-gray-700 mb-4 text-sm">
        Custom palette configured using Tailwind: Primary (<span className="text-[#4B7BEC] font-bold">#4B7BEC</span>),
        Secondary (<span className="text-[#A55EEA] font-bold">#A55EEA</span>),
        Accent (<span className="text-[#20BF6B] font-bold">#20BF6B</span>), and
        Background (<span className="text-gray-500 font-bold">#F4F6F7</span>).
      </p>
      <div className="flex gap-3">
        <button className="bg-[#4B7BEC] text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium text-sm">
          Primary Action
        </button>
        <button className="bg-[#A55EEA] text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium text-sm">
          Secondary
        </button>
        <button className="bg-[#20BF6B] text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium text-sm">
          Accent Highlight
        </button>
      </div>
    </div>
  );
}
