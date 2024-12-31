import { getPageVisits } from "@/lib/queries/getWebsitesAnalytics";
import CardList from "./cardList";

export default async function TopPageVisitsList({ params, dateRange }) {
  const data = await getPageVisits({ params, dateRange });

  return <CardList items={data} title="Top Pages" col1="page" col2="visits" />;
}
