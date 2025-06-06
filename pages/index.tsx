import Head from "next/head";
import Link from "next/link";

const faqs = [
  {
    question: "AI 如何引用网页？",
    answer: "结构清晰 + 权重高 + 使用 schema。",
    icon: "🤖"
  },
  {
    question: "什么是 JSON-LD FAQ schema?",
    answer: "帮助 AI 更好理解问答内容。",
    icon: "📋"
  },
  {
    question: "如何提升被收录概率？",
    answer: "使用 descriptive 语言，创建清晰结构。",
    icon: "📈"
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
        <title>AI FAQ Generator - 让内容更容易被AI引用</title>
        <meta name="description" content="专业的FAQ生成工具，优化内容结构，提升AI引用率" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI FAQ Generator
                </span>
              </div>
              <div className="flex space-x-4">
                <Link 
                  href="/topics" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  主题库
                </Link>
                <Link 
                  href="/generate" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  生成FAQ
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                让你的内容
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  被AI智能引用
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                专业的FAQ生成工具，优化内容结构，提升搜索引擎和AI模型的收录率
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/generate" 
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="mr-2">🚀</span>
                  开始生成FAQ
                </Link>
                <Link 
                  href="/topics" 
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
                >
                  <span className="mr-2">📚</span>
                  浏览主题库
                </Link>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
        </header>

        {/* FAQ Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              常见问题解答
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              了解如何优化内容以提升AI引用效果
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {faq.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-16 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </main>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              准备开始了吗？
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              立即生成专业的FAQ内容，提升你的内容影响力
            </p>
            <Link 
              href="/generate" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">✨</span>
              立即体验
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-600">
              <p>© 2024 AI FAQ Generator. 让内容更智能，让引用更简单。</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}