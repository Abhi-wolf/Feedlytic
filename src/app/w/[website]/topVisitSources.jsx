import {
  getCountryVisits,
  getSourceVisits,
} from "@/lib/queries/getWebsitesAnalytics";
import CardList from "./cardList";
const topSources = [
  { source: "Google", visits: 3000 },
  { source: "Direct", visits: 2500 },
  { source: "Facebook", visits: 1500 },
  { source: "Twitter", visits: 1000 },
  { source: "LinkedIn", visits: 800 },
];

export default async function TopVisitSources({ params }) {
  const sourcesData = await getSourceVisits({ params });
  const countryData = await getCountryVisits({ params });

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
      <CardList
        items={sourcesData}
        title="Top Visit Sources"
        col1="source"
        col2="visits"
      />
      <CardList
        items={countryData}
        title="Top Country"
        col1="country"
        col2="visits"
      />
    </div>
  );
}
