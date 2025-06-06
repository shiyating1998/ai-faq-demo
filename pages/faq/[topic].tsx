// pages/faq/[topic].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { generateFAQ } from "../api/generate-faq";

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
      <title>{topic} 的常见问题解答 | AI FAQ Demo</title>
        <meta name="description" content={`关于 ${topic} 的常见问题`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <main className="max-w-4xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">关于「{topic}」的 FAQ</h1>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white shadow p-6 rounded-xl">
              <h2 className="text-xl font-semibold">{f.question}</h2>
              <p className="mt-2 text-gray-700">{f.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 可改为从数据库或文件中读取历史生成记录
  return {
    paths: [],
    fallback: "blocking",
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
