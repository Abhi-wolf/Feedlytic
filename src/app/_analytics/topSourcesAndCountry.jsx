import {
  getCountryVisits,
  getSourceVisits,
} from "@/lib/queries/getWebsitesAnalytics";
import CardList from "./cardList";

export default async function TopSourcesAndCountry({ params }) {
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
