// Week 5 - Day 4 - Task 1: User Controller with CRUD operations

// In-memory data store
let users = [
  { id: 1, name: "Aman", age: 22 },
  { id: 2, name: "Sara", age: 25 }
];

// GET all users
exports.getUsers = (req, res) => {
  res.status(200).json(users);
};

// GET one user by ID
exports.getUserById = (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
};

// POST create user
exports.createUser = (req, res) => {
  const { name, age } = req.body;
  if (!name || age === undefined || age === null) {
    return res.status(400).json({ error: "Name and age are required" });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    age: Number(age)
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

// PUT update user
exports.updateUser = (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, age } = req.body;
  if (name !== undefined) user.name = name;
  if (age !== undefined) user.age = Number(age);

  res.status(200).json(user);
};

// DELETE user
exports.deleteUser = (req, res) => {
  const index = users.findIndex((u) => u.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users = users.filter((u) => u.id != req.params.id);
  res.status(200).json({ message: "User deleted" });
};
