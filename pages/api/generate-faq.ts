import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

// Fallback FAQs when OpenAI is not available
const getFallbackFAQs = (topic: string) => [
  {
    question: `什么是${topic}？`,
    answer: `${topic}是一个重要的概念，需要深入了解其基本原理和应用场景。`
  },
  {
    question: `如何学习${topic}？`,
    answer: `学习${topic}需要系统性的方法，建议从基础概念开始，逐步深入实践。`
  },
  {
    question: `${topic}有什么优势？`,
    answer: `${topic}具有多种优势，可以帮助提高效率和解决实际问题。`
  }
];

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
console.log("key:",process.env.OPENAI_API_KEY);
console.log("openai available:", !!openai);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { topic } = req.body;
  console.log("received topic:", topic);
  if (!topic) {
    return res.status(400).json({ error: "缺少 topic 参数" });
  }

  // If no OpenAI API key, return fallback FAQs
  if (!openai) {
    console.log("OpenAI API key not configured, using fallback FAQs");
    return res.status(200).json({ faqs: getFallbackFAQs(topic) });
  }

  try {
    const completion = await openai.chat.completions.create({
      //model: "gpt-3.5-turbo",
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: "你是一个专业的内容编辑助手，生成 FAQ 问答。" },
        { role: "user", content: `请为"${topic}"生成 3 条简洁的 FAQ，回答用简体中文，返回 JSON 格式，包含 question 和 answer 字段。` },
      ],
      max_tokens: 500,
    }, {
      timeout: 30000, // 10 second timeout
    });
    console.log("completion:", completion);
    const result = completion.choices[0].message.content;
    const faqs = JSON.parse(result || "[]");

    res.status(200).json({ faqs });
} catch (error: any) {
    console.error("生成 FAQ 失败：", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      response: error.response?.data,
    });
    res.status(200).json({ faqs: getFallbackFAQs(topic) });
  }
  
}
