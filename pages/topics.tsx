import Link from "next/link";
import Head from "next/head";

const topics = [
  {
    name: "ChatGPT 提问技巧",
    description: "学习如何与AI高效对话，掌握提问的艺术",
    icon: "💬",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "AI 内容优化",
    description: "优化内容结构，让AI更好地理解和引用",
    icon: "🎯",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "写作瓶颈解决方案",
    description: "突破创作困境，提升写作效率和质量",
    icon: "✍️",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "远程办公效率",
    description: "掌握远程工作技巧，提升团队协作效率",
    icon: "🏠",
    color: "from-orange-500 to-red-500"
  },
  {
    name: "个人品牌构建",
    description: "打造专业形象，建立个人影响力",
    icon: "🌟",
    color: "from-indigo-500 to-purple-500"
  },
];

export default function TopicsPage() {
  return (
    <>
      <Head>
        <title>精选FAQ主题库 - AI FAQ Generator</title>
        <meta name="description" content="浏览精选的FAQ主题，获取专业的问答内容" />
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
                  href="/generate" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  生成FAQ
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="relative py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                精选
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FAQ主题库
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                探索热门主题，获取专业的FAQ内容，提升你的内容影响力
              </p>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
        </header>

        {/* Topics Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <Link
                key={topic.name}
                href={`/faq/${encodeURIComponent(topic.name)}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${topic.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-2xl">{topic.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {topic.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="flex items-center text-blue-600 font-medium">
                    <span className="mr-2">查看FAQ</span>
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  {/* Gradient bar */}
                  <div className={`mt-6 w-12 h-1 bg-gradient-to-r ${topic.color} rounded-full group-hover:w-16 transition-all duration-300`}></div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Card */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 lg:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                没找到想要的主题？
              </h2>
              <p className="text-xl mb-8 opacity-90">
                使用我们的AI生成器，为任何主题创建专业的FAQ内容
              </p>
              <Link 
                href="/generate" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🚀</span>
                立即生成FAQ
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