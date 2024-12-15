import { getSourceVisits } from "@/lib/queries/getWebsitesAnalytics";
import CardList from "./cardList";
const topSources = [
  { source: "Google", visits: 3000 },
  { source: "Direct", visits: 2500 },
  { source: "Facebook", visits: 1500 },
  { source: "Twitter", visits: 1000 },
  { source: "LinkedIn", visits: 800 },
];

export default async function TopVisitSources({ params }) {
  const data = await getSourceVisits({ params });

  return (
    <CardList
      items={data}
      title="Top Visit Sources"
      col1="source"
      col2="visits"
    />
  );
}
