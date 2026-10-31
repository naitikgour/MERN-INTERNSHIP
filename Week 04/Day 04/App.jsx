import InteractiveCard from "./Task 1/InteractiveCard";
import CustomThemeDemo from "./Task 2/CustomThemeDemo";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Week 4 Day 4 - Advanced Tailwind & Component Design</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <InteractiveCard />
          <CustomThemeDemo />
        </div>
      </div>
    </div>
  );
}
