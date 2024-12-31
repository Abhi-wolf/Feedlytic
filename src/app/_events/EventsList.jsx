"use client";

import { LoadingSpinner } from "@/components/loadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getEventsList } from "@/lib/queries/eventQueries";
import { transformTimestamp } from "@/lib/utils";
import { useEffect, useState } from "react";

function EventsList({ events, domain, dateRange }) {
  const [filter, setFilter] = useState("all");
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEventList() {
      setIsLoading(true);
      const list = await getEventsList({
        domain,
        eventName: filter,
        dateRange,
      });

      setEventList(list);
      setIsLoading(false);
    }

    fetchEventList();
  }, [filter, domain, dateRange]);

  let totalEventsCount = events?.reduce((acc, curr) => {
    acc += Number(curr.count) || 0; // Default to 0 if 'count' is undefined
    return acc;
  }, 0);

  return (
    <div className="w-full flex flex-col gap-6">
      <Carousel className="w-full  mx-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          <CarouselItem
            key="all"
            className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4"
          >
            <Card
              className="overflow-hidden cursor-pointer bg-primary text-primary-foreground"
              onClick={() => setFilter("all")}
            >
              <CardContent className="p-0">
                <div className="h-[200px] flex flex-col">
                  <div className="flex-1 flex items-center justify-center text-xl md:text-2xl font-bold p-4">
                    All Events
                  </div>
                  <div className="bg-secondary text-secondary-foreground flex items-center justify-center text-4xl md:text-6xl font-extrabold p-4">
                    {totalEventsCount < 10
                      ? `0${totalEventsCount}`
                      : totalEventsCount}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          {events?.map((event) => (
            <CarouselItem
              key={event.eventName}
              className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4"
            >
              <Card
                className="overflow-hidden cursor-pointer bg-card text-card-foreground"
                onClick={() => setFilter(event.eventName)}
              >
                <CardContent className="p-0">
                  <div className="h-[200px] flex flex-col">
                    <div className="flex-1 flex items-center justify-center text-xl md:text-2xl font-bold p-4 capitalize">
                      {event.eventName}
                    </div>
                    <div className="bg-accent text-accent-foreground flex items-center justify-center text-4xl md:text-6xl font-extrabold p-4">
                      {event.count < 10 ? `0${event.count}` : event.count}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 md:-left-12 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground" />
        <CarouselNext className="right-0 md:-right-12 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground" />
      </Carousel>
      <div className="w-full flex flex-col gap-4">
        <EventsTable
          eventList={eventList}
          filter={filter}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default EventsList;

function EventsTable({ eventList, filter, isLoading }) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>
          <span className="capitalize">{filter}</span> Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        ) : (
          <ul className="space-y-4">
            {eventList?.map((event) => (
              <li key={event.id} className="border-b pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold capitalize">
                      {event.eventName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {event.eventDescription}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {transformTimestamp(event.createdAt)}
                  </Badge>
                </div>
              </li>
            ))}

            {eventList?.length === 0 && (
              <div className="w-full my-2 text-red-500 ">No data found</div>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
