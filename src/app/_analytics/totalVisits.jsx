import { getTotalDomainVisits } from "@/lib/queries/getWebsitesAnalytics";
import CardBox from "./cardBox";

export default async function Totalvisits({ params }) {
  const data = await getTotalDomainVisits({ params });

  return <CardBox title="Total Visits" number={data} />;
}
