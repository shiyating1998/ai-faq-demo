import { useState } from "react";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateFAQ = async () => {
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">FAQ 自动生成器</h1>
        <input
          type="text"
          placeholder="请输入主题（如：AI 写作技巧）"
          className="w-full border px-4 py-2 mb-4 rounded"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          onClick={generateFAQ}
          disabled={!topic || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "生成中..." : "生成 FAQ"}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {faqs && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">生成结果：</h2>
            {faqs.map((faq, i) => (
              <div key={i} className="border rounded p-4">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="text-gray-700 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
