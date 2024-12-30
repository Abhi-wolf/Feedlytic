import { getEvents } from "@/lib/queries/eventQueries";
import AnalayticsHeader from "../../components/analayticsHeader";
import EventsList from "./EventsList";

async function EventsPage({ params, data }) {
  const events = await getEvents({ domain: params.website });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <AnalayticsHeader title="Events" data={data} />
      </div>

      <EventsList events={events} domain={params.website} />
    </div>
  );
}

export default EventsPage;
