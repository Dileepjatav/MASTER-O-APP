import {
  getUserPerformance,
  getSkillGapReport,
  getTimeBasedReport,
} from "../services/getDataFromDb.js";

export const reportUserPerformance = async (req, res) => {
  try {
    const data = await getUserPerformance();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const reportSkillGap = async (req, res) => {
  try {
    const data = await getSkillGapReport();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const reportTimeBased = async (req, res) => {
  try {
    const data = await getTimeBasedReport(req.data.range);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
