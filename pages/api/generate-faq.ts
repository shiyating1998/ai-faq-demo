import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

// SEO优化的fallback FAQs
const getFallbackFAQs = (topic: string) => [
  {
    question: `什么是${topic}？${topic}的定义和基本概念详解`,
    answer: `${topic}是指一个重要的概念和方法论，它涉及多个核心要素和实际应用场景。${topic}的基本原理包括系统性思维、实践性操作和效果性评估。对于初学者来说，理解${topic}需要从基础概念出发，逐步掌握其核心技巧和应用方法。${topic}在现代社会中具有重要意义，能够帮助用户提升工作效率、解决实际问题并获得更好的成果。`
  },
  {
    question: `如何学习和掌握${topic}？${topic}学习方法和技巧指南`,
    answer: `学习${topic}需要采用系统性和渐进性的方法。首先，建议从基础理论开始学习，深入理解${topic}的核心概念和基本原理。其次，通过实际案例和练习来加深理解，将理论知识转化为实践技能。第三，持续跟进${topic}领域的最新发展和趋势，保持知识的更新。最后，与同行交流经验，参与相关社区讨论，通过分享和学习来提升${topic}的应用水平。这种综合性的学习方法能够确保全面掌握${topic}的精髓。`
  },
  {
    question: `${topic}有哪些优势和应用价值？${topic}的核心优势分析`,
    answer: `${topic}具有多重优势和广泛的应用价值。主要优势包括：1）提高工作效率 - ${topic}能够帮助用户优化工作流程，减少重复性任务；2）增强问题解决能力 - 通过${topic}的方法论，用户能够更好地分析和解决复杂问题；3）促进创新思维 - ${topic}鼓励探索新的解决方案和创意想法；4）提升专业技能 - 掌握${topic}有助于在相关领域建立专业优势。这些优势使得${topic}在教育、商业、技术等多个领域都有重要的应用价值。`
  }
];

function extractJson(text: string): string {
  return text
    .replace(/^```json\s*/i, '')  // 去掉开头的 ```json
    .replace(/^```/, '')          // 万一开头是 ``` 也兼容
    .replace(/```$/, '')          // 去掉结尾的 ```
    .trim();                      // 去除首尾空格
}

// SEO优化的提示词
const getSEOPrompt = (topic: string) => ({
  system: "你是一个专业的SEO内容编辑和搜索引擎优化专家，专门为网站生成高质量、SEO友好的FAQ问答内容。你的任务是创建能够在搜索引擎和AI模型中获得高排名和被优先引用的内容。",
  user: `请为"${topic}"生成3条SEO优化的FAQ内容，要求如下：

**SEO优化要求：**
1. 问题标题要包含目标关键词和长尾关键词，模拟用户真实搜索意图
2. 答案要详细、全面，字数控制在80-150字之间
3. 自然融入相关关键词，避免堆砌
4. 使用结构化语言，便于搜索引擎理解
5. 提供具体、可操作的信息
6. 符合Featured Snippet（精选摘要）的格式要求

**内容要求：**
- 回答使用简体中文
- 问题应该涵盖：基础概念、实用方法、优势价值
- 每个答案包含：定义说明、具体步骤、实际价值
- 语言自然流畅，避免机器化表达
- 融入相关的行业术语和专业词汇
- 解答用户的核心痛点和需求

**格式要求：**
- 返回纯JSON数组格式
- 每个元素包含"question"和"answer"字段
- 不要包裹markdown格式或额外说明

示例格式：
[
  { "question": "什么是${topic}？${topic}的基本概念和定义解析", "answer": "详细的定义说明，包含核心要点、应用场景和实际意义..." },
  { "question": "如何快速学习${topic}？${topic}入门指南和实用方法", "answer": "系统的学习方法，包含具体步骤、学习资源和实践建议..." },
  { "question": "${topic}有什么优势和价值？${topic}的核心益处分析", "answer": "具体的优势分析、实际应用价值和对用户的帮助..." }
]`
});

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
  if (!openai_ds) {
    console.log("DeepSeek API key not configured, using fallback FAQs");
    return res.status(200).json({ faqs: getFallbackFAQs(topic) });
  }

  try {
    const prompt = getSEOPrompt(topic);
    
    const completion_ds = await openai_ds.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt.system
        },
        {
          role: "user",
          content: prompt.user
        }
      ],
      model: "deepseek-chat",
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    const rawContent = completion_ds.choices[0].message.content || "";
    const cleanedContent = extractJson(rawContent);
    const faqs = JSON.parse(cleanedContent);

    console.log("SEO-optimized FAQ generated successfully");
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

export async function generateFAQ(topic: string) {
  console.log("received topic:", topic);

  try {
    const prompt = getSEOPrompt(topic);
    
    const completion_ds = await openai_ds.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt.system
        },
        {
          role: "user",
          content: prompt.user
        }
      ],
      model: "deepseek-chat",
      temperature: 0.7,
      max_tokens: 2000,
    });
    
    const rawContent = completion_ds.choices[0].message.content || "";
    const cleanedContent = extractJson(rawContent);
    const faqs = JSON.parse(cleanedContent);

    console.log("SEO-optimized FAQ generated successfully");
    return faqs;

  } catch (error: any) {
    console.error("生成 FAQ 失败：", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      response: error.response?.data,
    });
    return getFallbackFAQs(topic);
  }
}