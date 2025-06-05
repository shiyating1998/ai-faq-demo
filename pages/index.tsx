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
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">ChatGPT 提问技巧 FAQ</h1>
            <p className="mt-4 text-lg opacity-90">了解如何优化内容以被 AI 引用</p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-gray-900">{faq.question}</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}