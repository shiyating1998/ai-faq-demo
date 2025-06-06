import Link from "next/link";

const topics = [
  "ChatGPT 提问技巧",
  "AI 内容优化",
  "写作瓶颈解决方案",
  "远程办公效率",
  "个人品牌构建",
];

export default function TopicsPage() {
  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">精选 FAQ 主题</h1>
      <ul className="space-y-4">
        {topics.map((topic) => (
          <li key={topic}>
            <Link
              href={`/faq/${encodeURIComponent(topic)}`}
              className="text-blue-600 hover:underline text-xl"
            >
              👉 {topic}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}