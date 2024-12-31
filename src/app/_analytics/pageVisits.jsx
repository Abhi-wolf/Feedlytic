import { getTotalPageVisits } from "@/lib/queries/getWebsitesAnalytics";
import CardBox from "./cardBox";

export default async function Pagevisits({ params, dateRange }) {
  const data = await getTotalPageVisits({ params, dateRange });

  return <CardBox title="Page Visits" number={data} />;
}
