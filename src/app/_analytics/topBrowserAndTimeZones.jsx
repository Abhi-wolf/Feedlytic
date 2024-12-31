import {
  getBrowserVisits,
  getTimeZoneVisits,
} from "@/lib/queries/getWebsitesAnalytics";
import CardList from "./cardList";

export default async function TopBrowserAndTimeZones({ params, dateRange }) {
  const timezoneData = await getTimeZoneVisits({ params, dateRange });
  const browserData = await getBrowserVisits({ params, dateRange });

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
      <CardList
        items={browserData}
        title="Browser"
        col1="browser"
        col2="visits"
      />
      <CardList
        items={timezoneData}
        title="Timezones"
        col1="timezone"
        col2="visits"
      />
    </div>
  );
}
