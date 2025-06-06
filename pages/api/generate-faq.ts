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

function extractJson(text: string): string {
  return text
    .replace(/^```json\s*/i, '')  // 去掉开头的 ```json
    .replace(/^```/, '')          // 万一开头是 ``` 也兼容
    .replace(/```$/, '')          // 去掉结尾的 ```
    .trim();                      // 去除首尾空格
}


const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const openai_ds = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.OPENAI_DS_API_KEY,
});
console.log("key:",process.env.OPENAI_DS_API_KEY);
console.log("openai_ds available:", !!openai_ds);

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

    
    // const completion = await openai.chat.completions.create({
    //   //model: "gpt-3.5-turbo",
    //   model: "gpt-3.5-turbo-0125",
    //   messages: [
    //     { role: "system", content: "你是一个专业的内容编辑助手，生成 FAQ 问答。" },
    //     { role: "user", content: `请为"${topic}"生成 3 条简洁的 FAQ，回答用简体中文，返回 JSON 格式，包含 question 和 answer 字段。` },
    //   ],
    //   max_tokens: 500,
    // }, {
    //   timeout: 30000, // 10 second timeout
    // });

    const completion_ds = await openai_ds.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "你是一个专业的内容编辑助手，专门为网站生成 FAQ 问答。"
        },
        {
          role: "user",
          content: `请为"${topic}"生成 3 条简洁明了的 FAQ，要求如下：
    
    1. 回答使用简体中文；
    2. 返回格式为 **纯 JSON 数组**，每个元素包含 "question" 和 "answer" 两个字段；
    3. **不要包裹 \`\`\`json 或任何 Markdown 格式**，也不要添加额外说明文字。
    
    示例返回格式：
    [
      { "question": "问题1？", "answer": "回答1。" },
      { "question": "问题2？", "answer": "回答2。" },
      { "question": "问题3？", "answer": "回答3。" }
    ]`
        }
      ],
      model: "deepseek-chat",
    });
    

    const rawContent = completion_ds.choices[0].message.content || "";
    const cleanedContent = extractJson(rawContent);
    const faqs = JSON.parse(cleanedContent);

    console.log("completion:", completion_ds);
    // const result = completion_ds.choices[0].message.content;
    // const faqs = JSON.parse(result || "[]");

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
