// pages/faq/[topic].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { generateFAQ } from "../api/generate-faq";
import FormattedAnswer from "../../components/FormattedAnswer";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQPageProps {
  topic: string;
  faqs: FAQ[];
}

export default function FAQPage({ topic, faqs }: FAQPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{topic} - 常见问题解答 | AI FAQ Generator</title>
        <meta name="description" content={`关于 ${topic} 的专业FAQ内容，优化AI引用效果`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI FAQ Generator
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  首页
                </Link>
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

        {/* Breadcrumb */}
        <div className="bg-white/50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">首页</Link>
              <span className="text-gray-400">/</span>
              <Link href="/topics" className="text-gray-500 hover:text-blue-600 transition-colors">主题库</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{topic}</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <header className="relative py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                关于
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  「{topic}」
                </span>
                的FAQ
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                专业的问答内容，针对搜索引擎和AI模型优化
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  AI生成内容
                </span>
                <span>•</span>
                <span>SEO优化</span>
                <span>•</span>
                <span>{faqs.length} 个问题</span>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
        </header>

        {/* FAQ Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    {/* Question Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{i + 1}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                        <span className="mr-3">❓</span>
                        {faq.question}
                      </h2>
                      <div className="prose max-w-none">
                        <div className="flex items-start mb-4">
                          <span className="mr-3 text-blue-600 text-xl mt-1">💡</span>
                          <div className="flex-1">
                            <FormattedAnswer answer={faq.answer} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Gradient Bar */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </div>
            ))}
          </div>

          {/* Related Actions */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              想要更多内容？
            </h2>
            <p className="text-xl mb-8 opacity-90">
              探索其他主题或生成自定义FAQ内容
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/topics" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">📚</span>
                浏览更多主题
              </Link>
              <Link 
                href="/generate" 
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                <span className="mr-2">🚀</span>
                生成新FAQ
              </Link>
            </div>
          </div>
        </main>

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

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = [
    "ChatGPT 提问技巧",
    "AI 内容优化", 
    "写作瓶颈解决方案",
    "远程办公效率",
    "个人品牌构建",
  ];

  return {
    paths: topics.map((topic) => ({
      params: { topic },
    })),
    fallback: "blocking", // 支持后续动态添加新 topic
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const topic = ctx.params!.topic as string;
  
  // 直接调用 generateFAQ 函数，避免 HTTP 请求
  const faqs = await generateFAQ(topic);
  
  return {
    props: {
      topic,
      faqs,
    },
  };
};
