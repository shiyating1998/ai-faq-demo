import { faqPages } from "@/data/faqs";
import { useRouter } from "next/router";

export default function FAQPage() {
  const { query } = useRouter();
  const slug = query.slug as string;

  const page = faqPages.find(p => p.slug === slug);
  if (!page) return <div>未找到该页面</div>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{page.topic}</h1>
      <div className="space-y-6">
        {page.faqs.map((faq, i) => (
          <div key={i}>
            <h2 className="font-semibold text-lg">❓ {faq.question}</h2>
            <p className="text-gray-700 mt-1">💡 {faq.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
