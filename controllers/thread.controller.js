import Thread from "../models/thread.model.js";
import { getOpenAIAPIResponse } from "../utils/openai.js";

export const getThreadById = async (req, res) => {
  const { threadId } = req.query;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json({ thread: thread });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllThread = async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    if (!threads) {
      res.status(404).json({ message: "Threads not found" });
    }
    res.status(200).json({ threads: threads });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteThreadById = async (req, res) => {
  const { threadId } = req.query;
  try {
    const thread = await Thread.findOneAndDelete({ threadId });
    if (!thread) {
      res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const chat = async (req, res) => {
  const { threadId, message } = req.body;
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    const reply = await getOpenAIAPIResponse(message);
    thread.messages.push({ role: "assistant", content: reply });
    thread.updatedAt = new Date();
    await thread.save();
    res.status(200).json({ reply: reply });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
