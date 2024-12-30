import {
  getDeviceVisits,
  getOSVisits,
} from "@/lib/queries/getWebsitesAnalytics";
import CardList from "./cardList";

export default async function TopOSAndDeviceType({ params }) {
  const deviceData = await getDeviceVisits({ params });
  const osData = await getOSVisits({ params });

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
      <CardList
        items={osData}
        title="Operating System"
        col1="os"
        col2="visits"
      />
      <CardList
        items={deviceData}
        title="Device Type"
        col1="device"
        col2="visits"
      />
    </div>
  );
}
