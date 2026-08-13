import NewsDetailPage from "@/components/news/NewsDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  return <NewsDetailPage params={params} />;
}
