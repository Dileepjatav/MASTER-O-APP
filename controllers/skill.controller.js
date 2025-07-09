import { z } from "zod";

import { getAllSkills } from "../services/getDataFromDb.js";
import { createSkill } from "../services/insertDataIntoDb.js";
import { updateSkill } from "../services/updateDataIntoDb.js";
import { deleteSkill } from "../services/deleteDataFromDb.js";

export const listSkills = async (req, res) => {
  try {
    const skills = await getAllSkills(req.query);
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSkill = async (req, res) => {
  try {
    const skill = await getSkillById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addSkill = async (req, res) => {
  try {
    const skillId = await createSkill(req.body);
    res.status(201).json({ message: "Skill created", id: skillId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editSkill = async (req, res) => {
  try {
    await updateSkill(req.params.id, req.data);
    res.json({ message: "Skill updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeSkill = async (req, res) => {
  try {
    await deleteSkill(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
