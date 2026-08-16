import MatchPage from "@/components/match/MatchPage";

type PageProps = {
  params: Promise<{
    matchId: string;
    matchSlug: string;
  }>;
};

export default function Page({ params }: PageProps) {
  return <MatchPage params={params} />;
}
