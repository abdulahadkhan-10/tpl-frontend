import PlayerProfilePage from "@/components/player/PlayerProfilePage";

interface PageProps {
  params: Promise<{ playername: string }>;
}

export default function Page({ params }: PageProps) {
  return <PlayerProfilePage params={params} />;
}
