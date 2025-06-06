import Head from "next/head";
import Link from "next/link";

const faqs = [
  {
    question: "什么是SEO优化的FAQ？",
    answer: "SEO优化的FAQ是针对搜索引擎和AI模型优化的问答内容。通过结构化数据标记、关键词优化和用户意图匹配，能够提升搜索排名和被AI引用的概率。优质FAQ内容容易获得Google精选摘要展示，显著增加网站流量和曝光度。",
    icon: "🎯"
  },
  {
    question: "AI如何理解网页内容？",
    answer: "AI模型通过分析网页的结构化数据、语义信息和内容质量来理解内容。使用JSON-LD标记、清晰的内容层次和权威性信号，可以显著提升被ChatGPT、Claude等AI模型引用的概率。结构化的FAQ格式特别受AI模型青睐。",
    icon: "🤖"
  },
  {
    question: "如何创建SEO友好的FAQ？",
    answer: "创建SEO友好FAQ的关键要素：1）使用长尾关键词构建问题；2）提供80-150字的详细答案；3）采用JSON-LD结构化标记；4）匹配用户真实搜索意图；5）保持专业性和权威性。这些方法能显著提升搜索可见性和点击率。",
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
        <title>SEO FAQ生成器 - 提升搜索排名和AI引用的专业工具</title>
        <meta name="description" content="专业的SEO FAQ内容生成工具，优化搜索引擎排名，提升ChatGPT等AI模型引用概率，获得Featured Snippet展示，增加网站流量" />
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
                SEO优化FAQ生成器
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  提升搜索排名和AI引用
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                专业的SEO FAQ内容生成工具，优化搜索引擎排名，提升ChatGPT等AI模型引用概率，获得更多精准流量
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
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              SEO与AI引用优化指南
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              掌握搜索引擎优化技巧，提升内容在Google搜索和AI模型中的表现
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {faq.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {faq.answer}
                </p>
                <div className="mt-4 w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-12 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </main>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              提升你的SEO排名
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              立即生成SEO优化的FAQ内容，获得Featured Snippet展示，提升搜索流量和AI引用率
            </p>
            <Link 
              href="/generate" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
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