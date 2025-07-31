import Thread from "../models/thread.model.js";
import { getOpenAIAPIResponse } from "../utils/openai.js";

export const getThreadById = async (req, res) => {
  const { threadId } = req.query;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json({ thread: thread });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllThread = async (req, res) => {
  const userId = req.user._id;
  try {
    const threads = await Thread.find({ userId }).sort({ updatedAt: -1 });
    if (!threads) {
      return res.status(404).json({ message: "Threads not found" });
    }
    return res.status(200).json({ threads: threads });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteThreadById = async (req, res) => {
  const { threadId } = req.query;
  const userId = req.user._id;
  try {
    const thread = await Thread.findOneAndDelete({ threadId, userId });
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    return res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const chat = async (req, res) => {
  const { threadId, message } = req.body;
  const userId = req.user._id;
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        userId,
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
    return res.status(200).json({ reply: reply });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
