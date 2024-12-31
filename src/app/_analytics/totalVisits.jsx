import { getTotalDomainVisits } from "@/lib/queries/getWebsitesAnalytics";
import CardBox from "./cardBox";

export default async function Totalvisits({ params, dateRange }) {
  const data = await getTotalDomainVisits({ params, dateRange });

  return <CardBox title="Total Visits" number={data} />;
}
