import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import FormattedAnswer from "../components/FormattedAnswer";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateFAQ = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    setError("");
    setFaqs(null);
    
    try {
      const res = await fetch("/api/generate-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (res.ok) {
        setFaqs(data.faqs);
      } else {
        setError(data.error || "生成失败");
      }
    } catch (err) {
      setError("请求失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && topic.trim()) {
      generateFAQ();
    }
  };

  return (
    <>
      <Head>
        <title>FAQ生成器 - AI FAQ Generator</title>
        <meta name="description" content="使用AI技术快速生成专业的FAQ内容" />
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
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="relative py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI FAQ
              </span>{" "}
              生成器
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              输入任何主题，让AI为你生成专业的FAQ内容，优化搜索引擎和AI模型的收录效果
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Generator Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">开始生成FAQ</h2>
              <p className="text-gray-600">输入你想要创建FAQ的主题</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="例如：AI 写作技巧、区块链技术、数字营销..."
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
                {loading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <button
                onClick={generateFAQ}
                disabled={!topic.trim() || loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    AI正在生成中...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    ✨ 生成FAQ内容
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-center">
                <span className="text-2xl mr-3">❌</span>
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">生成失败</h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {faqs && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  🎉 生成完成！
                </h2>
                <p className="text-gray-600">
                  关于「{topic}」的FAQ内容已经准备好了
                </p>
              </div>

              <div className="grid gap-6">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">{i + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-relaxed">
                          {faq.question}
                        </h3>
                        <div className="text-lg">
                          <FormattedAnswer answer={faq.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  onClick={() => {
                    setTopic("");
                    setFaqs(null);
                    setError("");
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  🔄 生成新主题
                </button>
                <button
                  onClick={() => {
                    const content = faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');
                    navigator.clipboard.writeText(content);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  📋 复制全部内容
                </button>
              </div>
            </div>
          )}

          {/* Tips Section */}
          {!faqs && !loading && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💡</span>
                生成提示
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span>尽量使用具体、清晰的主题描述</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span>可以包含行业、技术或具体场景</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span>生成的FAQ将针对SEO和AI引用进行优化</span>
                </li>
              </ul>
            </div>
          )}
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
