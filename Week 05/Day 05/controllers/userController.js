// Week 5 - Day 5: User Controller
let users = [
  { id: 1, name: "Aman", age: 22 },
  { id: 2, name: "Sara", age: 25 }
];

// GET all users
exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// GET user by ID
exports.getUserById = (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
};

// POST create user
exports.createUser = (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Name and age required" });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    age: Number(age)
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Task 3: Dynamic parameter endpoint (/api/users/:id/:section)
exports.getUserSection = (req, res) => {
  const { id, section } = req.params;
  const user = users.find((u) => u.id == id);
  res.status(200).json({
    userId: id,
    section: section,
    userFound: Boolean(user),
    data: user ? { ...user, sectionViewed: section } : null
  });
};

// Dynamic route with multiple parameters (/api/users/:userId/orders/:orderId?status=pending)
exports.getUserOrder = (req, res) => {
  const { userId, orderId } = req.params;
  res.status(200).json({
    message: "Order details",
    userId,
    orderId,
    query: req.query
  });
};
