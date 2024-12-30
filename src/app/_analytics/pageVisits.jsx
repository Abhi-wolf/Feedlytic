import { getTotalPageVisits } from "@/lib/queries/getWebsitesAnalytics";
import CardBox from "./cardBox";

export default async function Pagevisits({ params }) {
  const data = await getTotalPageVisits({ params });

  return <CardBox title="Page Visits" number={data} />;
}
