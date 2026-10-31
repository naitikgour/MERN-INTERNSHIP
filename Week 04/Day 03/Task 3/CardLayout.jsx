export default function CardLayout() {
  const cards = [
    { id: 1, title: "Web Development", desc: "Build scalable web applications using React and Node.js." },
    { id: 2, title: "UI/UX Design", desc: "Craft intuitive, user-friendly experiences with modern interfaces." },
    { id: 3, title: "Cloud & DevOps", desc: "Deploy and manage reliable cloud infrastructure with CI/CD." },
    { id: 4, title: "Mobile Apps", desc: "Develop native cross-platform mobile apps using React Native." }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div
            key={c.id}
            className="p-5 shadow-lg rounded-xl bg-white border border-gray-100 hover:scale-105 transition transform duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
