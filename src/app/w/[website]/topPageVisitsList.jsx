import { getPageVisits } from "@/lib/queries/getWebsitesAnalytics";
import CardList from "./cardList";

const topPages = [
  { page: "/home", visits: 5000 },
  { page: "/products", visits: 3000 },
  { page: "/about", visits: 2000 },
  { page: "/contact", visits: 1000 },
  { page: "/blog", visits: 800 },
];

export default async function TopPageVisitsList({ params }) {
  const data = await getPageVisits({ params });

  return <CardList items={data} title="Top Pages" col1="page" col2="visits" />;
}
