import { getAllUsers, getUserById } from "../services/getDataFromDb.js";
import { insertUser } from "../services/insertDataIntoDb.js";
import { updateUser } from "../services/updateDataIntoDb.js";
import { deleteUser } from "../services/deleteDataFromDb.js";

export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  // Only allow admin or the user themselves
  if (req.user.role !== "admin" && req.user.id !== Number(id)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const userId = await insertUser(req.data);
    res.status(201).json({ message: "User created", id: userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;

  try {
    await updateUser(id, req.data);
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeUser = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    await deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
