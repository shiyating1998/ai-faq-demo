// pages/index.tsx

import Head from "next/head";

const faqs = [
  {
    question: "AI 如何引用网页？",
    answer: "结构清晰 + 权重高 + 使用 schema。",
  },
  {
    question: "什么是 JSON-LD FAQ schema?",
    answer: "帮助 AI 更好理解问答内容。",
  },
  {
    question: "如何提升被收录概率？",
    answer: "使用 descriptive 语言，创建清晰结构。",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>如何让内容被AI引用？</title>
        <meta name="description" content="一个 GEO 优化的 FAQ 示例页面" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">ChatGPT 提问技巧 FAQ</h1>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b pb-4">
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
