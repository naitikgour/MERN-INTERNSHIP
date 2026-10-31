import ResponsiveNavbar from "./Task 2/ResponsiveNavbar";
import ButtonCard from "./Task 1/ButtonCard";
import CardLayout from "./Task 3/CardLayout";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Week 4 Day 3 - Tailwind CSS Integration</h1>
        <ButtonCard />
        <CardLayout />
      </div>
    </div>
  );
}
